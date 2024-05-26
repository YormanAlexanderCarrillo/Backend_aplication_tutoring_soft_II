import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TutoringService } from './tutoring.service';
import { CreateTutoringDto } from './dtos/tutoring.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/Enums/enum.role';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('Tutorings')
@ApiBearerAuth()
@Controller('tutoring')
export class TutoringController {
  constructor(private readonly tutoringService: TutoringService) {}

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/create-tutoring/:idSubject/:idTutor/:idStudent')
  async registerTutorng(
    @Body() tutoring: CreateTutoringDto,
    @Param('idSubject') idSubject: string,
    @Param('idTutor') idTutor: string,
    @Param('idStudent') idStudent: string,
  ) {
    return await this.tutoringService.createTutoring(
      idSubject,
      idTutor,
      idStudent,
      tutoring,
    );
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/get-all-tutoring-by-student/:idStudent')
  async getAllTutoring(@Param('idStudent') idStudent: string) {
    return await this.tutoringService.getAllTutoringByStudent(idStudent);
  }
}
