import { Schema as mongooseSchema } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/common/Enums/enum.role';
import { Subject } from 'src/subject/Schema/subject.schema';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  lastname: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  uid: string;
  @Prop({ enum: Role, default: Role.STUDENT })
  role: Role;
  @Prop([{ type: mongooseSchema.Types.ObjectId, ref: 'Subject' }])
  subject: Subject[];
}

export const UserSchema = SchemaFactory.createForClass(User);
