import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostParam, Post } from './post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly PostModel: Model<Post>) {}

  async fetchAllPosts(): Promise<Post[]> {
    const result = await this.PostModel.find().lean().exec();

    if (!result.length) throw new NotFoundException('No Post Found');

    return result;
  }

  async createNewPost(params: PostParam): Promise<Post> {
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

  async updatePostById(params: PostParam): Promise<Post> {
    const { postId, title, body, categoryId, status, label } = params;

    const updatePost = { title, body, categoryId, status, label };

    try {
      const result = await this.PostModel.findOneAndUpdate(
        {
          postId,
        },
        updatePost,
        {
          lean: true,
          returnDocument: 'after',
        },
      ).exec();

      if (!result) throw new NotFoundException('No Posts Found');

      return result;
    } catch (error) {
      return error;
    }
  }

  async deletePostById(postId: number): Promise<string> {
    try {
      const result = await this.PostModel.findOneAndDelete({ postId }).exec();
      if (!result)
        throw new NotFoundException(`No Post with id ${postId} Found`);

      return `Post with id ${postId} has been deleted`;
    } catch (error) {
      return error;
    }
  }
}
