import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;

  @Prop({ type: String, required: true, min: 3 })
  title: string;

  @Prop({ type: String, required: true, length: 4 })
  releaseDate: string;

  @Prop({ type: String, required: true })
  director: string;

  // Array contains at least one string
  @Prop({ type: [String], validate: (v: string[]) => Array.isArray(v) && v.length > 1 })
  stars: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
