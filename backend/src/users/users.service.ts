import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async create(user: User): Promise<User> {
    user.id = this.idCounter++;
    user.password = await bcrypt.hash(user.password, 10);
    this.users.push(user);
    return user;
  }
}

