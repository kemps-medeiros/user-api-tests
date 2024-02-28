import { User } from './user.entity';

describe('User entity', () => {
  it('should create a user instance', () => {
    const user = new User('John Doe', 'john@example.com');
    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
  });
});
