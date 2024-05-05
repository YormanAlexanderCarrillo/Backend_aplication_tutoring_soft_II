import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from './Schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './Dtos/create_user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
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
}
