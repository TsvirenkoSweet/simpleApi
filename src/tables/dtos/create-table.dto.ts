import { IsString, Length } from 'class-validator';

export class CreateTableDto {
    @IsString({ message: 'Name must be a string' })
    @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
    name: string;
}