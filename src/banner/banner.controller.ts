import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { Banner } from './banner.schema';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async findAll(): Promise<Banner[]> {
    return this.bannerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Banner> {
    return this.bannerService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  async create(
    @Body() banner: Banner,
    @UploadedFile() imageUrl: any,
  ): Promise<Banner> {
    return this.bannerService.create(banner, imageUrl);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() banner: Banner,
  ): Promise<Banner> {
    return this.bannerService.update(id, banner);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Banner> {
    return this.bannerService.delete(id);
  }
}
