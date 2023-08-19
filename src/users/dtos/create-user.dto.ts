import { IsEmail, IsString } from 'class-validator';

export class createUserDto {
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
