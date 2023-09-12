import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostParam } from './post.model';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getUsers() {
    const result = await this.postService.fetchAllPosts();

    return result;
  }

  @Post()
  async createPost(@Body() params: CreatePostParam) {
    const result = await this.postService.createNewPost(params);

    return result;
  }
}
