import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { VideoPayloadDto } from './video-payload.dto'
import { writeFile } from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpeg = require('ffmpeg');

@Controller('video-process')
export class VideoProcessController {
  @Post()
  processVideo(@Body() videoPayloadDto: VideoPayloadDto): string {
    writeFile(`./tmp/${videoPayloadDto.name}.mp4`, videoPayloadDto.videoURL, { encoding: 'base64' }, (err) => {
      if (err) {
        return new HttpException('Video cannot be processed', 406);
      }

      console.log('Finished writing video');

      try {
        new ffmpeg(`./tmp/${videoPayloadDto.name}.mp4`)
          .then((video) => {
            console.log('Finished processing video')
            video.fnExtractSoundToMP3(`./tmp/${videoPayloadDto.name}.mp3`, (err, file) => {
              if (err) {
                console.log(err);
              }
              console.log('Finished extracting audio from video');
            })
          })
          .catch((err) => {
            console.log(err);
            return;
          })
      } catch (err) {
        console.log(err);
        return new HttpException(err.msg, err.code)
      }
    })
    return 'Success';
  }
}
