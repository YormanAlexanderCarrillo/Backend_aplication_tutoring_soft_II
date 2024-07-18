import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Forum {
    @Prop({required:true})
    title:string;
    @Prop({required:true})
    description:string;
    @Prop({default: Date.now()})
    dateCreated:Date;
    @Prop({default: true})
    state: boolean
}

export const ForumSchema = SchemaFactory.createForClass(Forum);

