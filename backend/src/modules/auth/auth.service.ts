import {
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { LoggingService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly loggingService: LoggingService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const passMatch = await bcrypt.compare(pass, user.password);
      if (passMatch) {
        const { ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(loginDto: LoginDto, ipAddress: string) {
    const { username, password } = loginDto;
    const user = await this.validateUser(username, password);
    if (!user) {
      this.loggingService.logLoginFailure(username, ipAddress);
      throw new NotAcceptableException('Invalid credentials');
    }

    this.loggingService.logLoginSuccess(username, ipAddress);

    const payload = {
      name: user.name,
      username: user.username,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<void> {
    const { username, password, name } = registerDto;
    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await this.hashPassword(password);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      name,
    });
    await this.usersRepository.save(user);
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
