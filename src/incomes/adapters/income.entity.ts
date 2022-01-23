import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('incomes')
@Index(['description', 'date'], { unique: true })
export class IncomeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column('datetime', { precision: 6 })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
