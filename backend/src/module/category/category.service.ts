import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.model';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly CategoryModel: Model<Category>,
  ) {}

  async fetchAllCategories() {
    const result = await this.CategoryModel.find().lean().exec();

    if (!result.length) throw new NotFoundException('No Categories Found');

    return result;
  }
}
