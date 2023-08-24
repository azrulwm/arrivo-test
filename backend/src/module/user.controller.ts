import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  addUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('fullname') fullname: string,
  ) {
    if (!username || !password || !email || !fullname)
      return 'All fields are required';

    const result = this.userService.addNewUser(
      username,
      password,
      email,
      fullname,
    );

    return result;
  }
}
