import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { VideoPayloadDto } from './video-payload.dto'
import { writeFile } from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pathToFfmpeg = require('ffmpeg-static');
import * as Ffmpeg from 'fluent-ffmpeg';
import { Storage } from '@google-cloud/storage'

@Controller('video-process')
export class VideoProcessController {
  @Post()
  processVideo(@Body() videoPayloadDto: VideoPayloadDto): string {
    writeFile(`./tmp/${videoPayloadDto.name}.mp4`, videoPayloadDto.videoURL, { encoding: 'base64' }, async (err) => {
      if (err) {
        return new HttpException('Video cannot be processed', 406);
      }
      console.log('Finished writing video');

      try {
        await new Promise((resolve, reject) => {
          Ffmpeg(`./tmp/${videoPayloadDto.name}.mp4`)
            .setFfmpegPath(pathToFfmpeg)
            .noVideo()
            .on('start', () => {
              console.log('Starts processing video');
            })
            .on('error', (err, stdout, stderr) => {
              // console.log(err, stdout, stderr);
              reject(err);
            })
            .on('end', (stdout, stderr) => {
              // console.log(stdout, stderr);
              console.log('Completes processing video')
              resolve(true)
            })
            .saveToFile(`./tmp/${videoPayloadDto.name}.mp3`);
        })
      } catch (err) {
        return new HttpException('Internal server error', 500);
      }

      // const storage = new Storage();
      // const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET)
    })
    return 'Success';
  }
}
