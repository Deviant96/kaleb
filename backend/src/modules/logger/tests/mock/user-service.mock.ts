import * as bcrypt from 'bcryptjs';

export class UsersServiceMock {
  private readonly hashedPassword: string;

  constructor() {
    this.hashedPassword = bcrypt.hashSync('password', 10);
  }

  async findOne(username: string) {
    if (username === 'test') {
      return { id: 1, username: 'test', password: this.hashedPassword };
    }
    return null;
  }
}
