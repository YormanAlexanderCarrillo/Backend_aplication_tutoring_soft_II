import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ThreadSchema } from './Schema/thread.schema';

@Module({
  imports:[ MongooseModule.forFeature([{name: 'Thread', schema: ThreadSchema}]), ],
  providers: [ThreadsService],
  controllers: [ThreadsController]
})
export class ThreadsModule {}
