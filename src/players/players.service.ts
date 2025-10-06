import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { Table } from '../tables/table.entity';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepo: Repository<Player>,

        @InjectRepository(Table)
        private readonly tableRepo: Repository<Table>,
    ) {}

    async create(dto: CreatePlayerDto): Promise<Player> {
        let table: Table | null = null;

        if (dto.tableId) {
            table = await this.tableRepo.findOne({ where: { id: dto.tableId } });
            if (!table) throw new NotFoundException('Table not found');
        }

        const player = this.playerRepo.create({
            name: dto.name,
            table,
        });

        return this.playerRepo.save(player);
    }

    findAll(): Promise<Player[]> {
        return this.playerRepo.find({ relations: ['table'] });
    }

    async findOne(id: string): Promise<Player> {
        const player = await this.playerRepo.findOne({
            where: { id },
            relations: ['table'],
        });
        if (!player) throw new NotFoundException(`Player with id ${id} not found`);
        return player;
    }

    async update(id: string, dto: UpdatePlayerDto): Promise<Player> {
        const player = await this.playerRepo.preload({
            id,
            name: dto.name,
        });
        if (!player) throw new NotFoundException(`Player with id ${id} not found`);

        if (dto.tableId) {
            const table = await this.tableRepo.findOne({ where: { id: dto.tableId } });
            if (!table) throw new NotFoundException('Table not found');
            player.table = table;
        }

        return this.playerRepo.save(player);
    }

    async remove(id: string): Promise<void> {
        const result = await this.playerRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Player with id ${id} not found`);
        }
    }

    findByTable(tableId: string): Promise<Player[]> {
        return this.playerRepo.find({
            where: { table: { id: tableId } },
            relations: ['table'],
        });
    }
}
