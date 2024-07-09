import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mongooseSchema } from 'mongoose';
import { File } from 'src/file/Schema/file.schema';

@Schema()
export class Subject {
  @Prop({ required: true })
  name: String;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, unique: true })
  subjectCode: string;
  @Prop([{ type: mongooseSchema.Types.ObjectId, ref: 'File' }])
  supportMaterial: File[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
