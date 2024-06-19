import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './Schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './Dtos/create_user.dto';
import { Role } from 'src/common/Enums/enum.role';
import { SubjectService } from 'src/subject/subject.service';
import { UpdateTutor } from './Dtos/update_tutor.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly subjectService: SubjectService,
  ) {}

  async createUser(user: CreateUserDto) {
    try {
      const newUser = new this.userModel(user);
      await newUser.save();
      return {
        message: 'usuario Registrado',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        error: error,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async findUserByUid(uid: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ uid });
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findUserById(id: string) {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createTutor(user: CreateUserDto) {
    try {
      const tutorUser = new this.userModel(user);
      await tutorUser.save();
      return {
        message: 'Tutor creado',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllTutors() {
    try {
      const users = await this.userModel.find().populate('subject');
      let tutors = users.filter((user) => {
        return user.role === Role.TUTOR;
      });
      return tutors;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async addSubjectToTutor(id_tutor: string, id_subject: string) {
    try {
      const subject = await this.subjectService.findSubjectById(id_subject);
      const tutor = await this.userModel.findOne({ _id: id_tutor });
      if (subject && tutor) {
        tutor.subject.push(subject);
        await this.userModel.findOneAndUpdate({ _id: id_tutor }, tutor).exec();
        return {
          message: "Materia asignada",
          status: HttpStatus.OK
        }
       
      } else {
        throw new HttpException('No se encontro la materia o el usuario', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateTutor(id: string, tutor: UpdateTutor){
    try {
      const updatedTutor = await this.userModel.findByIdAndUpdate(id, tutor);
      return {
        message: 'Tutor actualizado',
        status: HttpStatus.OK,
        tutor: updatedTutor,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  
}
