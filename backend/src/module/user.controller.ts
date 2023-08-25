import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('fullname') fullname: string,
  ) {
    if (!username || !password || !email || !fullname)
      return 'All fields are required';

    const result = await this.userService.addNewUser(
      username,
      password,
      email,
      fullname,
    );

    return result;
  }

  @Get()
  async getOneUserByParam(
    @Body('id') id: string | null,
    @Body('email') email: string | null,
  ) {
    const params = { id, email };
    console.log(params);
    const result = this.userService.getOneUserByParams(params);

    return result;
  }

  @Get('all')
  async getUsers() {
    const result = await this.userService.getAllUsers();

    return result;
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string) {
    const params = { id };
    const result = this.userService.getOneUserByParams(params);

    return result;
  }
}
