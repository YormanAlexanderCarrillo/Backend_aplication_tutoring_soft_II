import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/Enums/enum.role';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateForumDto } from './dtos/create_forum.dto';

@ApiTags('Forum')
@ApiBearerAuth()
@Controller('forum')
export class ForumController {
    constructor(private readonly forumService: ForumService) {}

    @Roles(Role.ADMINISTRATOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Post('/create-forum')
    async createForum(@Body() forum: CreateForumDto) {
        return await this.forumService.createForum(forum);
    }

    @Roles(Role.ADMINISTRATOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Get('/get-forums')
    async getForums() {
        return await this.forumService.getForums();
    }


}
