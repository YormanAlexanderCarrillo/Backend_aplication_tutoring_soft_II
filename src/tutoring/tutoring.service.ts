import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tutoring } from './Schema/tutoring.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { SubjectService } from 'src/subject/subject.service';
import { CreateTutoringDto } from './dtos/tutoring.dto';
import { UpdateStatus } from './dtos/UpdateStatus.dto';
import { UpdateTutoringDto } from './dtos/UpdateTutoring.dto';

@Injectable()
export class TutoringService {
  constructor(
    @InjectModel(Tutoring.name) private readonly tutoringModel: Model<Tutoring>,
    private readonly userService: UserService,
    private readonly subjectService: SubjectService,
  ) {}

  async createTutoring(
    idSuject: string,
    idTutor: string,
    idStudent: string,
    tutoring: CreateTutoringDto,
  ) {
    try {
      const subject = await this.subjectService.findSubjectById(idSuject);
      const tutor = await this.userService.findUserById(idTutor);
      const student = await this.userService.findUserById(idStudent);
      const tutorin = new this.tutoringModel(tutoring);

      tutorin.subject = subject;
      tutorin.tutor = tutor;
      tutorin.student = student;

      const tutoringSave = await tutorin.save();

      return {
        message: 'Tutoria creada',
        data: tutoringSave,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllTutoringByStudent(_id: string) {
    try {
      const tutorings = await this.tutoringModel
        .find({ student: _id })
        .populate('tutor', 'name')
        .populate('subject', 'name')
        .exec();

      return {
        message: 'Tutorias Recuperadas',
        data: tutorings,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllTutoringByTutor(_id: string) {
    try {
      const tutorings = await this.tutoringModel
        .find({ tutor: _id })
        .populate('student', 'name')
        .populate('subject', 'name')
        .exec();

      return {
        message: 'Tutorias Recuperadas',
        data: tutorings,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateStatusTutoring(_id: string, status: boolean) {
    try {
      const tutoring = await this.tutoringModel.findByIdAndUpdate(
        _id,
        { status },
        { new: true },
      );

      if (!tutoring) {
        throw new HttpException('Tutoring not found', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Tutoria Actualizada',
        data: tutoring,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteTutoring(id: string) {
    try {
      const tutoring = await this.tutoringModel.findByIdAndDelete(id);
      if (!tutoring) {
        throw new HttpException('Tutoria no encontrada', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Tutoria Eliminada',
        data: tutoring,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  async updateTutoring(idtutoring:string, updateData: UpdateTutoringDto) {
    try {
      const tutoring = await this.tutoringModel.findByIdAndUpdate(
        idtutoring,
        updateData,
        { new: true },
      );

      if (!tutoring) {
        throw new HttpException('Tutoria no encontrada', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Tutoria Actualizada',
        data: tutoring,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
