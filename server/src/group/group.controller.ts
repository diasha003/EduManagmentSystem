import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, ParseIntPipe } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroups, Group, UpdateGroup } from 'shared/models';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    //   return this.groupService.update(+id, updateGroupDto);
    // }

    //auth
    @Post('/')
    async createGroup(@Body() dto: CreateGroups) {
        return this.groupService.createGroup(dto);
    }

    //auth
    @Get('/')
    async getAllGroups(@Headers() headers: any): Promise<Group[]> {
        return await this.groupService.getAllGroups(headers);
    }

    //@Auth()
    @Patch('/')
    async updatePost(@Body() dto: UpdateGroup) {
        return this.groupService.updateGroup(dto);
    }

    //@Auth()
    @Delete('/:id')
    async deleteComment(@Param('id', ParseIntPipe) id: number) {
        return this.groupService.deleteGroup(id);
    }
}
