import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.model';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    const result = await this.categoryService.fetchAllCategories();

    return result;
  }

  @Post()
  async createCategory(@Body() params: Category) {
    const result = await this.categoryService.createNewCategory(params);

    return result;
  }

  @Patch('/:id')
  async updateCategory(@Param('id') id: string, @Body() params: Category) {
    const updatedParams = { _id: id, ...params };

    const result =
      await this.categoryService.updateCategoriesById(updatedParams);

    return result;
  }
}
