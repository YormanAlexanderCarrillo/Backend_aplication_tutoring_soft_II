import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/Enums/enum.role';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateForumDto } from './dtos/create_forum.dto';
import { UpdateForumDto } from './dtos/update_forum.dto';

@ApiTags('Forum')
@ApiBearerAuth()
@Controller('forum')
export class ForumController {
    constructor(private readonly forumService: ForumService) {}

    @Roles(Role.ADMINISTRATOR, Role.TUTOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Post('/create-forum/:idTutor')
    async createForum(@Param("idTutor") idTutor: string ,@Body() forum: CreateForumDto) {
        return await this.forumService.createForum(idTutor, forum);
    }

    @Roles(Role.ADMINISTRATOR, Role.TUTOR, Role.STUDENT)
    @UseGuards(AuthGuard, RolesGuard)
    @Get('/get-forums/:idTutor')
    async getForums(@Param("idTutor") idTutor: string) {
        return await this.forumService.getForums(idTutor);
    }

    @Roles(Role.ADMINISTRATOR, Role.TUTOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Delete('/delete-forum/:idForum')
    async deleteForum(@Param("idForum") idForum: string) {
        return await this.forumService.deleteForum(idForum)
    }

    @Roles(Role.ADMINISTRATOR, Role.TUTOR)
    @UseGuards(AuthGuard, RolesGuard)
    @Put('/update-forum/:idForum')
    async updateForum(@Param("idForum") idForum: string, @Body() forum: UpdateForumDto) {
        return await this.forumService.updateForum(idForum, forum)
    }


}
