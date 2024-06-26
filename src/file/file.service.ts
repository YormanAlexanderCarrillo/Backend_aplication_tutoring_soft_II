import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { storage } from 'src/firebase/firebase_admin';

@Injectable()
export class FileService {
  async uploadFile(file: Express.Multer.File) {

    if (!file) {
       throw new HttpException('Archivo no proporcionado', HttpStatus.BAD_REQUEST)
    }

    const bucket = storage.bucket();
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
            contentType: file.mimetype,
        },
    })

    return new Promise((resolve, reject) => {
        blobStream.on('error', (err)=>{
            reject(new Error(err.message))
        })

        blobStream.on('finish', ()=>{
            resolve({
                message: "Archivo almacenado",
                filename: file.originalname
            })
        })

        blobStream.end(file.buffer)
    })
  }
}
