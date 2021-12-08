import { MovieDocument } from '../schema/movie.schema';
import { ResponseMovieDto } from '../dto/responseMovie.dto';

// You can use auto-mapper for high large applications.

export class MovieMapper {
  static documentToResponseDto(movieDocument: MovieDocument): ResponseMovieDto {
    const { _id, title, releaseDate, director, stars } = movieDocument;
    const responseDto = new ResponseMovieDto();
    responseDto._id = _id;
    responseDto.title = title;
    responseDto.releaseDate = releaseDate;
    responseDto.director = director;
    responseDto.stars = stars;

    return responseDto;
  }

  static documentArrayToResponseDtoArray(movieDocumentArray: MovieDocument[]): ResponseMovieDto[] {
    return movieDocumentArray.map((movieDocument) => this.documentToResponseDto(movieDocument));
  }
}
