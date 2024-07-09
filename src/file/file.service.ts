import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { storage } from 'firebase-admin';
import { SubjectService } from 'src/subject/subject.service';

@Injectable()
export class FileService {
  constructor(private readonly subjectService: SubjectService) {}

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

    const response = this.subjectService.addMaterialToSubject(
      id,
      downloadUrl[0],
    );

    return response;
  }

  async getMaterialBySubjectId(id: string) {
    const response = this.subjectService.findSubjectById(id);
    return response;
  }
}
