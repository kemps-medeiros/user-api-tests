import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() req: any): User {
    const { name, email } = req.body;

    if (!name) {
      throw new HttpException('Name is required', HttpStatus.BAD_REQUEST);
    }

    return this.userService.createUser(name, email);
  }

  @Get()
  findAllUsers(): User[] {
    return this.userService.findAllUsers();
  }
}
