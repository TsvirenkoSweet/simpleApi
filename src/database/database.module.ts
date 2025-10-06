import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Table } from '../tables/table.entity';
import { Player } from '../players/player.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: process.env.POSTGRES_HOST || 'localhost',
                port: Number(process.env.POSTGRES_PORT) || 5432,
                username: process.env.POSTGRES_USER || 'postgres',
                password: process.env.POSTGRES_PASSWORD || 'postgres',
                database: process.env.POSTGRES_DB || 'casino',
                entities: [Table, Player],
                synchronize: false,
                logging: false,
            }),
        }),
    ],
})
export class DatabaseModule {}
