import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://arrivo:jimbet@cluster0.8wmwuqh.mongodb.net/arrivoTest?retryWrites=true&w=majority',
    ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
