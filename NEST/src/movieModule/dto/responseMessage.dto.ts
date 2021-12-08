import { IsNotEmpty } from 'class-validator';

export class ResponseMessageDto {
  @IsNotEmpty()
  message: string;
}
