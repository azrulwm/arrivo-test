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

  async createNewCategory(params: Partial<Category>) {
    const { name, description, activated } = params;

    try {
      // Fetch latest categoryId
      const latestCategoryId = await this.CategoryModel.findOne()
        .sort({
          categoryId: -1,
        })
        .limit(1);

      let categoryId = 0;

      if (!latestCategoryId) {
        categoryId = 1;
      } else {
        categoryId = latestCategoryId.categoryId + 1;
      }

      const newCategory = new this.CategoryModel({
        categoryId,
        name,
        description,
        activated,
      });

      const result = await newCategory.save();

      return result;
    } catch (error) {
      return error.message;
    }
  }
}
