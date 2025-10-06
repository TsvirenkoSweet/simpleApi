import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Table } from '../tables/table.entity';

@Entity('players')
export class Player {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @ManyToOne(() => Table, (table) => table.players, {
        onDelete: 'SET NULL',
        nullable: true,
    })
    @JoinColumn({ name: 'table_id' })
    table?: Table | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
