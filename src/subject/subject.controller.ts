import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSubjectDto } from './dtos/create_subject.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/Enums/enum.role';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('Subjects')
@ApiBearerAuth()
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Roles(Role.ADMINISTRATOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/register-subject')
  async createSubject(@Body() subject: CreateSubjectDto) {
    return await this.subjectService.createSubject(subject);
  }

  @Roles(Role.ADMINISTRATOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/get-all-subjects')
  async getAllSubjects() {
    return await this.subjectService.getAllSubjects();
  }

  @Roles(Role.ADMINISTRATOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('/delete-subject/:id')
  async deleteSubject(@Param('id') id: string) {
    return await this.subjectService.deleteSubject(id);
  }
}
