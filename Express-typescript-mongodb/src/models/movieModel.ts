import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

//This is our movie object type. This Interface is only for typescript.
export interface IMovie {
  _id?: string;
  title: string;
  releaseData: string;
  director: string;
  stars: string[];
}

//This is our builder return type, because Mongoose additionally put some values to our object, so we implement the Document type.
export interface IMovieDocument extends IMovie, mongoose.Document<string> {}

interface IMovieModel extends mongoose.Model<IMovieDocument> {
  build(attr: IMovie): IMovieDocument;
}

const movieSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: () => uuidv4(),
  },
  title: {
    type: String,
    required: true,
    min: 3,
  },
  releaseDate: {
    type: String,
    required: true,
    length: 4,
  },
  director: {
    type: String,
    required: true,
  },
  // Array contains at least one string
  stars: {
    type: [String],
    validate: (v: string[]) => Array.isArray(v) && v.length > 1,
  },
});

// This static function of the Movie class helps us, to type check the movie object.
movieSchema.statics.build = (attr: IMovie) => new Movie(attr);

// Note that <any, IMovieModel> type is for the type script, this is how we tell them to recognise the build function.
export const Movie = mongoose.model<any, IMovieModel>('Movie', movieSchema);
