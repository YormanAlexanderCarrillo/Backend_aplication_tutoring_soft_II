import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Thread } from './Schema/thread.schema';
import { Model } from 'mongoose';
import { CreateThreadDto } from './dtos/create_thread.dto';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectModel(Thread.name) private readonly threadModel: Model<Thread>,
  ) {}

  async createThread(thread: CreateThreadDto) {
    try {
      const newThread = new this.threadModel(thread);
      const dataThread = await newThread.save();
      return {
        message: 'Comentario registrado',
        data: dataThread,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findCommnentsByForum(forumId: string) {
    try {
      const threads = await this.threadModel.find({ forum: forumId });
      return {
        message: 'Comentarios obtenidos',
        data: threads,
        status: HttpStatus.OK,
      };
    } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
