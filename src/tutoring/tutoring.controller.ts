import { Body, Controller, Param, Post } from '@nestjs/common';
import { TutoringService } from './tutoring.service';
import { CreateTutoringDto } from './dtos/tutoring.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Tutorings')
@Controller('tutoring')
export class TutoringController {
  constructor(private readonly tutoringService: TutoringService) {}

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
}
