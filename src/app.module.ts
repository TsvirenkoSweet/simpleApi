import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TablesModule } from './tables/tables.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [DatabaseModule, TablesModule, PlayersModule],
})
export class AppModule {}