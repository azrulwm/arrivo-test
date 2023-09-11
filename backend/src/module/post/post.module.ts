import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './post.model';
import { PostController } from './post.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
  controllers: [PostController],
  providers: [],
})
export class PostModule {}
