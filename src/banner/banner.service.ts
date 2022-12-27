import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner } from './banner.schema';
import { Dropbox } from 'dropbox';
import axios from 'axios';

@Injectable()
export class BannerService {
  constructor(@InjectModel(Banner.name) private bannerModel: Model<Banner>) {}

  async findAll(): Promise<Banner[]> {
    return this.bannerModel.find().exec();
  }

  async findOne(id: string): Promise<Banner> {
    return this.bannerModel.findById(id).exec();
  }

  async create(banner: Banner, file: any): Promise<Banner> {
    const dropboxClient = new Dropbox({
      accessToken:
        'sl.BVsGxDNRCWQ3J5AkyWo17NXs9hcHCgJu9r6DTk-N8KypRJAJcn2CatKAmqKg8sXE3K9g4PcWwhxKm-Gpl4ONFmacT7pT2kfki7yGYILLz08HZM6gWmTGJRJbqXN5HrVGff2GHR-TBsOj',
    });
    const fileBuffer = file.buffer;
    const fileName = `${banner.nameOfBanner}.jpg`;
    const filePath = `/banners/${fileName}`;
    await dropboxClient.filesUpload({
      path: filePath,
      contents: fileBuffer,
    });

    var data = JSON.stringify({
      path: filePath,
    });

    var config = {
      method: 'post',
      url:
        'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
      headers: {
        Authorization:
          'Bearer sl.BVsGxDNRCWQ3J5AkyWo17NXs9hcHCgJu9r6DTk-N8KypRJAJcn2CatKAmqKg8sXE3K9g4PcWwhxKm-Gpl4ONFmacT7pT2kfki7yGYILLz08HZM6gWmTGJRJbqXN5HrVGff2GHR-TBsOj',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const res = await axios(config);
    banner.imageUrl = res.data.url;

    const createdBanner = new this.bannerModel(banner);
    return createdBanner.save();
  }

  async update(id: string, banner: Banner): Promise<Banner> {
    return this.bannerModel.findByIdAndUpdate(id, banner, { new: true }).exec();
  }

  async delete(id: string): Promise<Banner> {
    return this.bannerModel.findByIdAndDelete(id).exec();
  }
}
