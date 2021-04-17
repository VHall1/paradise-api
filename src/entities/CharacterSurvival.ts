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
export class CharacterSurvival extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array', { nullable: true })
  lastCoords: number[];

  @Column({ default: 200 })
  health: number;

  @Column({ default: 0 })
  armour: number;

  @JoinColumn()
  @OneToOne(() => Character, { onDelete: 'CASCADE' })
  character: Character;
}
