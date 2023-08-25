import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { identity } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async addNewUser(
    username: string,
    password: string,
    email: string,
    fullName: string,
  ): Promise<User> {
    const newUser = new this.UserModel({
      username,
      password,
      email,
      fullName,
    });

    const result = await newUser.save();
    return result;
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
    const updatedParams: any = {};

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
}
