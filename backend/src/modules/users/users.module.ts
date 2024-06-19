import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  InjectDataSource,
  TypeOrmDataSourceFactory,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {
  constructor(
    @InjectDataSource()
    private dataSource: TypeOrmDataSourceFactory,
  ) {}
}
