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
export class CharacterCustom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'mp_m_freemode_01' })
  model: string;

  @Column({ type: 'jsonb', nullable: true })
  custom: JSON;

  @Column({ type: 'jsonb', nullable: true })
  clothes: JSON;

  @JoinColumn()
  @OneToOne(() => Character, { onDelete: 'CASCADE' })
  character: Character;
}
