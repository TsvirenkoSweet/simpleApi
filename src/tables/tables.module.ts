import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './table.entity';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { Player } from '../players/player.entity';
import { PlayersService } from '../players/players.service';

@Module({
    imports: [TypeOrmModule.forFeature([Table, Player])],
    controllers: [TablesController],
    providers: [TablesService, PlayersService],
    exports: [TablesService],
})
export class TablesModule {}
