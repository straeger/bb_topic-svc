import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TopicDocument = Topic & Document;

@Schema()
export class Topic {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
