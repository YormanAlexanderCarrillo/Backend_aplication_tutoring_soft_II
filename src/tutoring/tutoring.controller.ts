import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TutoringService } from './tutoring.service';
import { CreateTutoringDto } from './dtos/tutoring.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/Enums/enum.role';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UpdateStatus } from './dtos/UpdateStatus.dto';
import { UpdateTutoringDto } from './dtos/UpdateTutoring.dto';

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

  @Roles(Role.TUTOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/get-all-tutoring-by-tutor/:idTutor')
  async getAllTutorigByTutor(@Param('idTutor') idTutor: string) {
    return await this.tutoringService.getAllTutoringByTutor(idTutor);
  }

  @Roles(Role.TUTOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Put('update-status-tutoring/:idTutoring/:status')
  async updateStatusTutoring(
    @Param('idTutoring') idTutoring: string,
    @Param('status') status: boolean,
  ) {
    return await this.tutoringService.updateStatusTutoring(idTutoring, status);
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('delete-tutoring/:idTutoring')
  async deleteTutoring(@Param('idTutoring') idTutoring: string) {
    return await this.tutoringService.deleteTutoring(idTutoring)
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Put('update-tutoring/:idtutoring')
  async updateTutoring(@Param('idtutoring') idtutoring: string, @Body() updateData: UpdateTutoringDto) {
    return await this.tutoringService.updateTutoring(idtutoring, updateData)
  }

}
