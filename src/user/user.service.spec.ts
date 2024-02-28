import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user', () => {
    const user = new User('John Doe', 'john@example.com');
    const createdUser = userService.createUser('John Doe', 'john@example.com');
    expect(createdUser).toEqual({ ...user, id: 1 });
  });

  it('should find all users', () => {
    const user1 = new User('John Doe', 'john@example.com');
    const user2 = new User('Jane Doe', 'jane@example.com');
    userRepository.save(user1);
    userRepository.save(user2);
    const foundUsers = userService.findAllUsers();
    expect(foundUsers).toEqual([user1, user2]);
  });
});
