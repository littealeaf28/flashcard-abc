import { Test, TestingModule } from '@nestjs/testing';
import { VideoProcessController } from './video-process.controller';

describe('VideoProcessController', () => {
  let controller: VideoProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoProcessController],
    }).compile();

    controller = module.get<VideoProcessController>(VideoProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
