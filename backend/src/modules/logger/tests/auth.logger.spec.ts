import { Test, TestingModule } from '@nestjs/testing';
import { LoggingService } from '../logger.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { AuthService } from '../../auth/auth.service';
import { UserRepositoryMock } from './mock/user-repository.mock';
import { UsersServiceMock } from './mock/user-service.mock';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { NotAcceptableException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let loggingService: LoggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        {
          provide: 'UserRepository',
          useClass: UserRepositoryMock,
        },
        {
          provide: LoggingService,
          useValue: {
            logLoginSuccess: jest.fn(),
            logLoginFailure: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'test-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    loggingService = module.get<LoggingService>(LoggingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should log successful login', async () => {
      const loginDto: LoginDto = { username: 'test', password: 'password' };
      const ipAddress = '127.0.0.1';

      const result = await service.login(loginDto, ipAddress);

      expect(result.access_token).toBe('test-token');
      expect(loggingService.logLoginSuccess).toHaveBeenCalledWith(
        loginDto.username,
        ipAddress,
      );
      expect(loggingService.logLoginFailure).not.toHaveBeenCalled();
    });

    it('should log failed login', async () => {
      const loginDto: LoginDto = { username: 'wrong', password: 'password' };
      const ipAddress = '127.0.0.1';

      await expect(service.login(loginDto, ipAddress)).rejects.toThrow(
        NotAcceptableException,
      );
      expect(loggingService.logLoginSuccess).not.toHaveBeenCalled();
      expect(loggingService.logLoginFailure).toHaveBeenCalledWith(
        loginDto.username,
        ipAddress,
      );
    });
  });
});
