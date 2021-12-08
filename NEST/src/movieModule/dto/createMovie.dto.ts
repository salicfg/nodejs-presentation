import { IsDefined, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class CreateMovieDto {
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
