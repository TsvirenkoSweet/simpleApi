import { DataSource } from 'typeorm';
import { Table } from '../tables/table.entity';
import { Player } from '../players/player.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Table, Player],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
});
