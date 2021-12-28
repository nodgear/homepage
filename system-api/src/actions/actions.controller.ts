import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { ActionsService } from './actions.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';


@ApiTags('actions')
@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('documentPath', 20, {
    storage: diskStorage({
      destination: 'src/actions/files',
      //filename: Helper.customFileName,
    }),
  }))
  async create(@UploadedFiles() files, @Body() dto: CreateActionDto) {
    const response = [];
    files.forEach(file => {
      const fileResponse = {
        originalname: file.originalname,
        filename: file.filename,
      }
      response.push(fileResponse);
    });
    return this.actionsService.create(dto);
  }

  @Get()
  findAll() {
    return this.actionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.actionsService.findOne(_id);
  }

  @Patch(':id')
  update(@Param('id') _id: string, @Body() dto: UpdateActionDto) {
    return this.actionsService.update(_id, dto);
  }

  @Delete(':id')
  remove(@Param('id') _id: string) {
    return this.actionsService.remove(_id);
  }
}
