import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFlowerDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  color!: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
