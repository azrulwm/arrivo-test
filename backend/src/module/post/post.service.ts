import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostParam, Post } from './post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly PostModel: Model<Post>) {}

  async fetchAllPosts(): Promise<Post[]> {
    const result = await this.PostModel.find().lean().exec();

    if (!result.length) throw new NotFoundException('No Post Found');

    return result;
  }

  async createNewPost(params: CreatePostParam): Promise<Post> {
    const { title, body, categoryId, status, label } = params;

    try {
      // Fetch the latest post
      const latestPost = await this.PostModel.findOne()
        .sort({ postId: -1 })
        .limit(1);
      let postId;
      if (!latestPost) {
        postId = 1; // If there are no posts yet, start with 1.
      } else {
        postId = latestPost.postId + 1; // Increment the last postId
      }

      const newPost = new this.PostModel({
        postId,
        title,
        body,
        categoryId,
        status,
        label,
      });

      const result = await newPost.save();

      return result;
    } catch (error) {
      return error.message;
    }
  }
}
