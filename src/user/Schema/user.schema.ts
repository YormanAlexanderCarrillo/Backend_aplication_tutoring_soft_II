import { RouterModule } from '@nestjs/core';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/common/Enums/enum.role';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
