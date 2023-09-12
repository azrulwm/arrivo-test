import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostParam } from './post.model';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getUsers() {
    const result = await this.postService.fetchAllPosts();

    return result;
  }

  @Post()
  async createPost(@Body() params: PostParam) {
    const result = await this.postService.createNewPost(params);

    return result;
  }

  @Patch('/:id')
  async updatePost(@Body() params: PostParam, @Param('id') postId: number) {
    const result = await this.postService.updatePostById({ postId, ...params });

    return result;
  }

  @Delete(':id')
  async deletePost(@Param('id') postId: number) {
    const result = await this.postService.deletePostById(postId);

    return result;
  }
}
