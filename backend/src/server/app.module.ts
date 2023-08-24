import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../module/user.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL), UserModule],
})
export class AppModule {}
