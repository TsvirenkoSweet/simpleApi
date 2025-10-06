import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreatePlayerDto {
    @IsString({ message: 'Name must be a string' })
    @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
    name: string;

    @IsOptional()
    @IsUUID('4', { message: 'tableId must be a valid UUID' })
    tableId?: string;
}
