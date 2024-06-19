import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthController } from 'src/modules/auth/auth.controller';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { User } from 'src/modules/users/entities/user.entity';

const mockUserRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('AuthService', () => {
  let service: AuthService;
  let repository: ReturnType<typeof mockUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useClass: Repository,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: RegisterDto) =>
                Promise.resolve({ id: '1', ...user }),
              ),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get(getRepositoryToken(User));
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const registerDto: RegisterDto = {
        name: 'Test User',
        username: 'testuser',
        password: 'testpassword',
      };

      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(registerDto);
      repository.save.mockResolvedValue({
        id: 1,
        ...registerDto,
      });

      await expect(service.register(registerDto)).resolves.not.toThrow();
    });

    it('should throw a ConflictException if the username already exists', async () => {
      const registerDto: RegisterDto = {
        name: 'Test User',
        username: 'testuser',
        password: 'testpassword',
      };

      repository.findOne.mockResolvedValue({
        id: 1,
        ...registerDto,
      });

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
