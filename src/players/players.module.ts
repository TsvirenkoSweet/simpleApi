import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { Table } from '../tables/table.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Player, Table])],
    controllers: [PlayersController],
    providers: [PlayersService],
    exports: [PlayersService],
})
export class PlayersModule {}
