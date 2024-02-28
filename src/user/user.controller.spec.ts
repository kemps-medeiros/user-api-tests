import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(null);
    userController = new UserController(userService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should throw an error if name is not provided', () => {
    const req = { body: { email: 'john@example.com' } };
    expect(() => userController.createUser(req)).toThrow(
      new HttpException('Name is required', HttpStatus.BAD_REQUEST),
    );
  });

  it('should create a user', () => {
    const req = { body: { name: 'John Doe', email: 'john@example.com' } };
    const user = new User('John Doe', 'john@example.com');
    jest.spyOn(userService, 'createUser').mockReturnValue(user);
    const createdUser = userController.createUser(req);
    expect(createdUser).toEqual(user);
  });

  it('should find all users', () => {
    const user1 = new User('John Doe', 'john@example.com');
    const user2 = new User('Jane Doe', 'jane@example.com');
    jest.spyOn(userService, 'findAllUsers').mockReturnValue([user1, user2]);
    const foundUsers = userController.findAllUsers();
    expect(foundUsers).toEqual([user1, user2]);
  });
});
