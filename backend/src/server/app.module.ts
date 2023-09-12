import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../module/user/user.module';
import { PostModule } from 'src/module/post/post.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
