import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { storage } from 'firebase-admin';
import { SubjectService } from 'src/subject/subject.service';
import { File } from './Schema/file.schema';
import { Model } from 'mongoose';
import { createFileDto } from './dtos/create_file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<File>,
    private readonly subjectService: SubjectService,
  ) {}

  async uploadFile(id: string, file: Express.Multer.File) {
    if (!file || !file.buffer) {
      throw new HttpException(
        'File is not defined or buffer is empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    const bucket = storage().bucket();
    const filename = `uploads/${file.originalname}`;
    const fileUpload = bucket.file(filename);

    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    const downloadUrl = await fileUpload.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });

    const titleDocument = file.originalname;
    const fileSizeMB = file.buffer.length / (1024 * 1024);

    const fileToDB: createFileDto = {
      name: titleDocument,
      size: fileSizeMB,
      urlDownload: downloadUrl[0],
    };

    const newfile = new this.fileModel(fileToDB);
    const dataFile = await newfile.save();

    const response = this.subjectService.addMaterialToSubject(id, dataFile);

    return response;
  }

  async getMaterialBySubjectId(id: string) {
    const response = this.subjectService.findSubjectById(id);
    return response;
  }
}
