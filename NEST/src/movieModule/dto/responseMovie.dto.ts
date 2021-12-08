import { IsDefined, IsNotEmpty, IsString, IsUUID, Length, MinLength } from 'class-validator';

export class ResponseMovieDto {
  @IsNotEmpty()
  @IsUUID('4')
  _id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(4)
  releaseDate: string;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsDefined()
  @IsString({ each: true })
  @MinLength(1, {
    each: true,
  })
  stars: string[];
}
