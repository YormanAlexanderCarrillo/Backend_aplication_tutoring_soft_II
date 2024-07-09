import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class File {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  size: number;
  @Prop({ required: true })
  urlDownload: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
