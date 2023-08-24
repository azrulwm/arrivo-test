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
  ) {
    const newUser = new this.UserModel({
      username,
      password,
      email,
      fullName,
    });

    const result = await newUser.save();
    return result;
  }

  async getAllUsers() {
    const result = await this.UserModel.find().lean().exec();

    if (!result) throw new NotFoundException('No User Found');

    const updadatedResult = result.map((item) => {
      const { _id, ...otherProps } = item;
      const updatedItem = { id: item._id, ...otherProps };
      return updatedItem;
    });

    return updadatedResult;
  }

  async getOneUserById(userId: string) {
    try {
      const { _id, ...otherProps } = await this.UserModel.findById(userId)
        .lean()
        .exec();

      return { id: _id, ...otherProps };
    } catch (error) {
      throw new NotFoundException('No User Found');
    }
  }
}
