import { Module } from '@nestjs/common';
import { VideoProcessController } from './video-process/video-process.controller';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'build')
    })
  ],
  controllers: [VideoProcessController],
})
export class AppModule {
}
