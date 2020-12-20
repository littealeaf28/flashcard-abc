import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { VideoPayloadDto } from './video-payload.dto'
import { writeFile } from 'fs';
import * as Ffmpeg from 'fluent-ffmpeg';
import { Storage } from '@google-cloud/storage'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pathToFfmpeg = require('ffmpeg-static');
// import { speech } from '@google-cloud__text-to-speech'

const storage = new Storage();
const bucket = storage.bucket('flashcard-abc-audio');

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

      try {
        await new Promise((resolve, reject) => {
          bucket.file(`./tmp/${videoPayloadDto.name}.mp3`)
            .createWriteStream({ resumable: false })
            .on('error', (err) => {
              reject(err);
            })
            .on('finish', () => {
              resolve(true);
            })
        })
      } catch (err) {
        return new HttpException('Internal server error', 500);
      }

      try {
        // const client = new speech.SpeechClient();

      } catch (err) {
        return new HttpException('Internal server error', 500);
      }

    })
    return 'Success';
  }
}
