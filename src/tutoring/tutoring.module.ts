import { Module } from '@nestjs/common';
import { TutoringService } from './tutoring.service';
import { TutoringController } from './tutoring.controller';
import { SubjectModule } from 'src/subject/subject.module';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Tutoring, TutoringShema } from './Schema/tutoring.schema';

@Module({
  imports: [
    SubjectModule,
    UserModule,
    MongooseModule.forFeature([{ name: Tutoring.name, schema: TutoringShema }]),
  ],
  providers: [TutoringService],
  controllers: [TutoringController],
})
export class TutoringModule {}
