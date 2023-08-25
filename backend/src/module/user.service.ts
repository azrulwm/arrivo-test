import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserParams } from './user.model';
import { after } from 'node:test';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async addNewUser(params: Partial<UserParams>): Promise<User> {
    const { username, password, email, fullName } = params;

    try {
      const newUser = new this.UserModel({
        username,
        password,
        email,
        fullName,
      });

      const result = await newUser.save();
      return result;
    } catch (error) {
      if (error.code === 11000)
        throw new HttpException(
          'Email Address Has Already Been Used',
          HttpStatus.BAD_REQUEST,
        );

      return error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.UserModel.find().lean().exec();

    if (!result) throw new NotFoundException('No User Found');

    const updadatedResult = result.map((item) => {
      const { _id, ...otherProps } = item;
      const updatedItem = { id: item._id, ...otherProps };
      return updatedItem;
    });

    return updadatedResult;
  }

  async getOneUserByParams(params: Partial<User>) {
    const { id, email } = params;
    const updatedParams: Partial<UserParams> = {};

    if (id) updatedParams._id = id;

    if (email) updatedParams.email = email;

    try {
      const { _id, ...otherProps } = await this.UserModel.findOne(updatedParams)
        .lean()
        .exec();

      return { id: _id, ...otherProps };
    } catch (error) {
      throw new NotFoundException('No User Found');
    }
  }

  async updateUserDetails(params: Partial<User>) {
    const { id, username, password, fullName, membership } = params;
    const updatedParams: Partial<UserParams> = {};

    if (username) updatedParams.username = username;
    if (password) updatedParams.password = password;
    if (fullName) updatedParams.fullName = fullName;
    if (membership) updatedParams.membership = membership;

    try {
      const result = await this.UserModel.findOneAndUpdate(
        { _id: id },
        updatedParams,
        {
          lean: true,
          returnDocument: 'after',
        },
      );

      return result;
    } catch (error) {
      throw new NotFoundException('No User Found');
    }
  }

  async deleteUserById(id: string) {
    try {
      await this.UserModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }

    return 'User has been deleted';
  }
}
