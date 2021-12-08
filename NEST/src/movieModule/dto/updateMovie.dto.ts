import { IsNotEmpty, IsOptional, IsString, IsUUID, Length, MinLength } from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  @IsUUID('4')
  _id: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  @Length(4)
  releaseDate: string;

  @IsOptional()
  @IsString()
  director: string;

  @IsOptional()
  @IsString({ each: true })
  @MinLength(1, {
    each: true,
  })
  stars: string[];
}
