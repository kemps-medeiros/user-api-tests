import { User } from './user.entity';

export class UserRepository {
  private data: User[] = [];
  private idCounter: number = 1;

  save(user: User): User {
    user.id = this.idCounter++;
    this.data.push(user);
    return user;
  }

  findAll(): User[] {
    return this.data;
  }

  clear(): void {
    this.data = [];
  }
}
