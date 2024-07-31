import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Forum } from './Schema/forum.schema';
import { Model } from 'mongoose';
import { CreateForumDto } from './dtos/create_forum.dto';
import { UpdateForumDto } from './dtos/update_forum.dto';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel(Forum.name) private readonly forumModel: Model<Forum>,
  ) {}

  async createForum(idTutor: string, forum: CreateForumDto) {
    try {
      const forumWithTutorId = { ...forum, tutor: idTutor };
  
      const newForum = new this.forumModel(forumWithTutorId);
      //console.log(newForum);
  
      const dataForum = await newForum.save();
      return {
        message: 'Foro creado',
        data: dataForum,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getForums(idTutor: string) {
    try {
      const forums = await this.forumModel.find({ tutor: idTutor });
      return {
        message: 'Foros obtenidos',
        data: forums,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteForum(idForum: string) {
    try {
      const forum = await this.forumModel.findByIdAndDelete(idForum);
      return {
        message: 'Foro eliminado',
        data: forum,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateForum(idForum: string, forum: UpdateForumDto) {
    try {
      const forumUpdated = await this.forumModel.findByIdAndUpdate(
        idForum,
        forum,
        { new: true },
      );
      return {
        message: 'Foro actualizado',
        data: forumUpdated,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllForums() {
    try {
      const forums = await this.forumModel.find();
      return {
        message: 'Foros obtenidos',
        data: forums,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
