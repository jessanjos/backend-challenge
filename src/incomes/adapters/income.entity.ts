import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Income } from '../domain/income';

@Entity('incomes')
@Index(['description', 'date'], { unique: true })
export class IncomeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 6, scale: 2 })
  value: number;

  @Column('datetime', { precision: 6 })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(description: string, value: number, date: Date) {
    this.description = description;
    this.value = value;
    this.date = date;
  }

  static from(income: Income) {
    return new IncomeEntity(income.description, income.value, income.date);
  }

  toIncome() {
    return new Income({
      id: this.id,
      description: this.description,
      value: this.value,
      date: this.date,
    });
  }
}
