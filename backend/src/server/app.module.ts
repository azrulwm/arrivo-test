import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../module/user/user.module';
import { PostModule } from 'src/module/post/post.module';
import { CategoryModule } from 'src/module/category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    PostModule,
    CategoryModule,
  ],
})
export class AppModule {}
