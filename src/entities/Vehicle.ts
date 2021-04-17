import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from './Character';

@Entity()
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plate: string;

  @Column({ default: 100 })
  fuel: number;

  @Column({ default: 100 })
  body: number;

  @Column({ default: 100 })
  engine: number;

  @Column('simple-array')
  lastCoords: number[];

  @Column('simple-array')
  tires: boolean[];

  @Column('simple-array')
  windows: boolean[];

  @Column('simple-array')
  doors: boolean[];

  @ManyToOne(() => Character, (character) => character.vehicles)
  owner: Character;
}
