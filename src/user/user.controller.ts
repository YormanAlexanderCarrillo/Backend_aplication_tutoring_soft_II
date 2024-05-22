import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get-tutors')
  async getAllTutors() {
    return this.userService.getAllTutors();
  }

  @Post('/add-subject-to-tutor:id_tutor/:id_subject')
  async addSubjectToTutor(
    @Param('id_tutor') id_tutor: string,
    @Param('id_subject') id_subject: string,
  ) {
    return this.userService.addSubjectToTutor(id_tutor, id_subject);
  }
}
