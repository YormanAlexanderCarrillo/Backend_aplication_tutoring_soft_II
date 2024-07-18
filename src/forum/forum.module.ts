import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Forum, ForumSchema } from './Schema/forum.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Forum.name, schema: ForumSchema }]),
  ],
  providers: [ForumService],
  controllers: [ForumController]
})
export class ForumModule {}
