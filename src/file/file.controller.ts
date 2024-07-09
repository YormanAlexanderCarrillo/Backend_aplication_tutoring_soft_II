import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/Enums/enum.role';

@ApiTags('Files')
@ApiBearerAuth()
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload-file/:idSubject')
  @Roles(Role.ADMINISTRATOR)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('idSubject') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.uploadFile(id, file);
  }

  @Get('/get-material-by-subject/:idSubject')
  @Roles(Role.ADMINISTRATOR, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  async getMaterialBySubjectId(@Param('idSubject') id: string) {
    return this.fileService.getMaterialBySubjectId(id);
  }
}
