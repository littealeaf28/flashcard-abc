import { Module } from '@nestjs/common';
import { VideoProcessController } from './video-process/video-process.controller';

@Module({
  imports: [],
  controllers: [VideoProcessController],
})
export class AppModule {}
