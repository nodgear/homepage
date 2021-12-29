import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { ActionsService } from './actions.service';
import { CreateActionDto } from './dto/create-action.dto';
import { Helper } from './fileHandling/fileHandling';

@ApiTags('actions')
@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('documentPath', 5, {
      storage: diskStorage({
        destination: 'src/actions/files',
        filename: Helper.customFileName,
      }),
    }),
  )
  async create(@UploadedFiles() files, @Body() dto: CreateActionDto) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        filename: file.filename,
        fileBuffer: '',
      };
      response.push(fileReponse);
    });
    try {
      await this.actionsService.validSendFile(response, dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return this.actionsService.create(response, dto);
  }

  @Get()
  findAll() {
    return this.actionsService.findAll();
  }
}
