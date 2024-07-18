import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Forum } from './Schema/forum.schema';
import { Model } from 'mongoose';
import { CreateForumDto } from './dtos/create_forum.dto';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel(Forum.name) private readonly forumModel: Model<Forum>,
  ) {}

  async createForum(forum: CreateForumDto) {
    try {
      const newForum = new this.forumModel(forum);
      console.log(newForum);

      const dataForum = await newForum.save();
      return {
        message: 'Foro creado',
        data: dataForum,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getForums() {
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
