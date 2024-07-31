import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as mongooseSchema } from 'mongoose';
import { User } from "src/user/Schema/user.schema";

@Schema()
export class Forum {
    @Prop({required:true})
    title:string;
    @Prop({required:true})
    description:string;
    @Prop({default:()=> Date.now()})
    dateCreated:Date;
    @Prop({default: true})
    state: boolean
    @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'User' })
    tutor: User;
}

export const ForumSchema = SchemaFactory.createForClass(Forum);

