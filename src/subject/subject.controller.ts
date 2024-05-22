import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateSubjectDto } from './dtos/create_subject.dto';

@ApiTags('Subjects')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post('/register-subject')
  async createSubject(@Body() subject: CreateSubjectDto) {
    return await this.subjectService.createSubject(subject);
  }

  @Get('/get-all-subjects')
  async getAllSubjects() {
    return await this.subjectService.getAllSubjects();
  }
}
