import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/Enums/enum.role';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateUserDto } from './Dtos/create_user.dto';
import { UpdateTutor } from './Dtos/update_tutor.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.STUDENT, Role.ADMINISTRATOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/get-tutors')
  async getAllTutors() {
    return this.userService.getAllTutors();
  }

  @Roles(Role.ADMINISTRATOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/add-subject-to-tutor/:id_tutor/:id_subject')
  async addSubjectToTutor(
    @Param('id_tutor') id_tutor: string,
    @Param('id_subject') id_subject: string,
  ) {
    return this.userService.addSubjectToTutor(id_tutor, id_subject);
  }

  @Roles(Role.ADMINISTRATOR, Role.TUTOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Put('/update-tutor/:id')
  async updateTutor(@Param('id') id: string, @Body() tutor: UpdateTutor) {
    return this.userService.updateTutor(id, tutor);
  }
}
