import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './table.entity';
import { CreateTableDto } from './dtos/create-table.dto';
import { UpdateTableDto } from './dtos/update-table.dto';
import { Player } from '../players/player.entity';

@Injectable()
export class TablesService {
    constructor(
        @InjectRepository(Table)
        private readonly tableRepo: Repository<Table>,

        @InjectRepository(Player)
        private readonly playerRepo: Repository<Player>,
    ) {}

    async create(dto: CreateTableDto): Promise<Table> {
        const table = this.tableRepo.create(dto);
        return this.tableRepo.save(table);
    }

    findAll(): Promise<Table[]> {
        return this.tableRepo.find({ relations: ['players'] });
    }

    async findOne(id: string): Promise<Table> {
        const table = await this.tableRepo.findOne({
            where: { id },
            relations: ['players'],
        });
        if (!table) throw new NotFoundException(`Table with id ${id} not found`);
        return table;
    }

    async update(id: string, dto: UpdateTableDto): Promise<Table> {
        const table = await this.tableRepo.preload({ id, ...dto });
        if (!table) throw new NotFoundException(`Table with id ${id} not found`);
        return this.tableRepo.save(table);
    }

    async remove(id: string): Promise<void> {
        const result = await this.tableRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Table with id ${id} not found`);
        }
    }

    async getPlayers(tableId: string): Promise<Player[]> {
        const table = await this.tableRepo.findOne({ where: { id: tableId } });
        if (!table) throw new NotFoundException(`Table with id ${tableId} not found`);
        return this.playerRepo.find({
            where: { table: { id: tableId } },
        });
    }
}
