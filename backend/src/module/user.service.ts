import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

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
}
