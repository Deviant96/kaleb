import { ConflictException, Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user) {
        const passMatch = await bcrypt.compare(pass, user.password);
        if (passMatch) {
            const { password, ...result } = user;
            return result;
        }
    }
    return null;
  }


  async login(user: User) {
    const validated = await this.validateUser(user.username, user.password);
    console.log('validated :', validated);
    if (!validated) throw new NotAcceptableException('Your credential is not found');

    const payload = { username: user.username, name: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user: { 
        username: validated.username,
        name: validated.name
      },
    };
  }

  async register(user: any) {
    const { name, username, password } = user;
    const existingUser = await this.usersService.findOne(username);

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    return this.usersService.create({ name, username, password });
  }
}
