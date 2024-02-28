import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(name: string, email: string): User {
    const user = new User(name, email);
    return this.userRepository.save(user);
  }

  findAllUsers(): User[] {
    return this.userRepository.findAll();
  }
}
