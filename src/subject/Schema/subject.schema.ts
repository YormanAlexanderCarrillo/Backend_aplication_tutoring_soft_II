import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Subject {
  @Prop({ required: true })
  name: String;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, unique: true })
  subjectCode: string;
  @Prop({ required: false })
  supportMaterial: string[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
