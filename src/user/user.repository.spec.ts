import { UserRepository } from './user.repository';
import { User } from './user.entity';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('should save a user', () => {
    const user = new User('John Doe', 'john@example.com');
    userRepository.save(user);
    expect(userRepository.findAll()).toContain(user);
  });

  it('should find all users', () => {
    const user1 = new User('John Doe', 'john@example.com');
    const user2 = new User('Jane Doe', 'jane@example.com');
    userRepository.save(user1);
    userRepository.save(user2);
    expect(userRepository.findAll()).toEqual([user1, user2]);
  });
});
