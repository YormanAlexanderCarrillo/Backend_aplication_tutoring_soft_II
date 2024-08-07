import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from './Schema/subject.schema';
import { Model } from 'mongoose';
import { CreateSubjectDto } from './dtos/create_subject.dto';
import { File } from 'src/file/Schema/file.schema';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private readonly subjectModel: Model<Subject>,
  ) {}

  async createSubject(subject: CreateSubjectDto) {
    try {
      const newSubject = new this.subjectModel(subject);
      const dataSubject = await newSubject.save();
      return {
        message: 'Materia registrada',
        data: dataSubject,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findSubjectById(id: string) {
    try {
      const subject = await this.subjectModel.findById(id).populate('supportMaterial');
      return subject;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllSubjects() {
    try {
      const subjects = await this.subjectModel.find();
      return {
        data: subjects,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteSubject(id: string) {
    try {
      const subject = await this.subjectModel.findByIdAndDelete(id);
      if (subject) {
        return {
          message: 'Materia eliminada',
          status: HttpStatus.OK,
        };
      } else {
        return {
          message: 'Materia no encontrada',
          status: HttpStatus.NOT_FOUND,
        };
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateSubject(id: string, subject: CreateSubjectDto) {
    try {
      const updatedSubject = await this.subjectModel.findByIdAndUpdate(
        id,
        subject,
      );
      return {
        message: 'Materia actualizada',
        data: updatedSubject,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async addMaterialToSubject(idSubject: string, file: File) {
    try {
      const subject = await this.subjectModel.findById(idSubject);
      if (subject) {
        await this.subjectModel.findByIdAndUpdate(idSubject, {
          $push: { supportMaterial: file },
        });
        return {
          message: 'Material Agregado',
          status: HttpStatus.OK,
        };
      } else {
        throw new HttpException(
          'No se encontro la materia',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
