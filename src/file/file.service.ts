import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { storage } from 'firebase-admin';

@Injectable()
export class FileService {
  async uploadFile(file: Express.Multer.File) {
    const bucket = storage().bucket();
    const fileUpload = await bucket.upload(file.path, {
      destination: `uploads/${file.originalname}`,
      metadata: {
        contentType: file.mimetype,
      },
    });

    const downloadUrl = await fileUpload[0].getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });

    return {
      url: downloadUrl[0],
    };
  }
}
