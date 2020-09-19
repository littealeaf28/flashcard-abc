import { Body, Controller, Post } from '@nestjs/common'

@Controller('video-process')
export class VideoProcessController {
  @Post()
  processVideo(@Body() body: any): string {
    console.log(body);
    return 'success';
  }
}
