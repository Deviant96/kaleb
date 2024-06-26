import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { IpAddress } from 'src/common/decorators/ip-address.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @IpAddress() ipAddress: string) {
    return this.authService.login(loginDto, ipAddress);
  }

  @Post('register')
  async register(
    @Body()
    registerBody: RegisterDto,
  ) {
    return this.authService.register(registerBody);
  }
}
