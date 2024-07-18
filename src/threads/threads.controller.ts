import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dtos/create_thread.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/Enums/enum.role';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Thread')
@ApiBearerAuth()
@Controller('threads')
export class ThreadsController {
    constructor(private readonly threadsService: ThreadsService) {}

    @Roles(Role.STUDENT, Role.ADMINISTRATOR, Role.TUTOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Post('/add-thread')
    async createThread(@Body() thread: CreateThreadDto) {
      return await this.threadsService.createThread(thread);
    }

    @Roles(Role.STUDENT, Role.ADMINISTRATOR, Role.TUTOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Get('/get-comments/:forumId')
    async findCommnentsByForum(@Param('forumId') forumId: string) {
      return await this.threadsService.findCommnentsByForum(forumId);
    }
}
