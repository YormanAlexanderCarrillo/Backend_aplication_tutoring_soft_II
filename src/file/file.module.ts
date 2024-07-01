import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage()
    }),
    SubjectModule
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
