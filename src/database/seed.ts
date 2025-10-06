import { DataSource } from 'typeorm';
import { Table } from '../tables/table.entity';
import { Player } from '../players/player.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'casino',
    entities: [Table, Player],
    synchronize: true,
});

export const runSeed = async () => {
    await AppDataSource.initialize();

    const tableRepo = AppDataSource.getRepository(Table);
    const playerRepo = AppDataSource.getRepository(Player);

    const count = await tableRepo.count();
    if (count > 0) {
        console.log('✅ Seed skipped: tables already exist.');
        await AppDataSource.destroy();
        return;
    }

    const tables = tableRepo.create([
        { name: 'Blackjack Table #1' },
        { name: 'Poker Table #2' },
        { name: 'Roulette Table #3' },
    ]);

    await tableRepo.save(tables);

    const players = playerRepo.create([
        { name: 'Alice', table: tables[0] },
        { name: 'Bob', table: tables[0] },
        { name: 'Charlie', table: tables[1] },
        { name: 'Diana', table: tables[2] },
    ]);

    await playerRepo.save(players);

    console.log('🎲 Database seeded successfully!');
    await AppDataSource.destroy();
};
