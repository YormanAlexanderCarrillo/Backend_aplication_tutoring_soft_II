import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as mongooseSchema } from "mongoose";
import { Forum } from "src/forum/Schema/forum.schema";

@Schema()
export class Thread{

    @Prop({type: mongooseSchema.Types.ObjectId, ref: 'Forum'})
    forum: Forum;
    @Prop({required: true})
    comment:string;
    @Prop({default:()=> Date.now()})
    dateCreated:Date;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
