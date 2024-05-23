import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Schema as mongooseSchema} from "mongoose";
import { Subject } from "src/subject/Schema/subject.schema";
import { User } from "src/user/Schema/user.schema";

@Schema()
export class Tutoring {
    @Prop({required: true})
    name:string;
    @Prop({required: true})
    reason: string;
    @Prop({required: true})
    date:Date;
    @Prop({required:true})
    hour: string;
    @Prop({required:true})
    status: boolean;
    @Prop({type: mongooseSchema.Types.ObjectId, ref:'User'})
    student: User;
    @Prop({type: mongooseSchema.Types.ObjectId, ref: 'User'})
    tutor: User;
    @Prop([{ type: mongooseSchema.Types.ObjectId, ref: 'Subject',}])
    subject: Subject;


}

export const TutoringShema = SchemaFactory.createForClass(Tutoring);