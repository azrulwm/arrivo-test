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

  async updateCategoriesById(params: Category) {
    const { _id } = params;

    try {
      const result = await this.CategoryModel.findOneAndUpdate(
        { _id },
        { ...params },
        { returnDocument: 'after', lean: true },
      );

      if (!result) throw new NotFoundException('No Categories Found');

      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteCategoryById(_id: string) {
    try {
      const result = await this.CategoryModel.findOneAndDelete({ _id });

      if (!result) throw new NotFoundException('No Category Found');

      return `Categories with the name "${result.name}" has been deleted`;
    } catch (error) {
      return error;
    }
  }
}
