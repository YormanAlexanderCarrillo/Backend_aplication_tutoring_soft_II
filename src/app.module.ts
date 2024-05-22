import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TutoringModule } from './tutoring/tutoring.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URL_MONGO),
    UserModule,
    AuthModule,
    TutoringModule,
    SubjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
