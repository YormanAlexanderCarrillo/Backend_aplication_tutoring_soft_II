import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { SubjectModule } from 'src/subject/subject.module';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './Schema/file.schema';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage()
    }),
    SubjectModule,
    MongooseModule.forFeature([{name: File.name, schema: FileSchema}])
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
