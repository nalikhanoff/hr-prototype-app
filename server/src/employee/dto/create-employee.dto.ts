import { IsEmail, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  position: string;
  @IsEmail()
  email: string;
}
