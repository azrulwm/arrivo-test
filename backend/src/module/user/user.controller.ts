import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('fullName') fullName: string,
  ) {
    if (!username || !password || !email || !fullName)
      return 'All fields are required';

    const params = { username, password, email, fullName };
    const result = await this.userService.addNewUser(params);

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

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('fullName') fullName: string,
    @Body('membership') membership: string,
  ) {
    const params = { id, username, password, fullName, membership };

    const result = this.userService.updateUserDetails(params);

    return result;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const result = await this.userService.deleteUserById(id);

    return result;
  }
}
