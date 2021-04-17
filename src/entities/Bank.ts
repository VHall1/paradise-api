import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from './Character';

@Entity()
export class Bank extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 500 })
  wallet: number;

  @Column({ default: 4500 })
  bank: number;

  @JoinColumn()
  @OneToOne(() => Character, { onDelete: 'CASCADE' })
  character: Character;
}
