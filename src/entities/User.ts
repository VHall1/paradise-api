import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from './Character';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  steam: string;

  @Column({ unique: true })
  discord: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ default: false })
  whitelisted: boolean;

  @Column({ default: false })
  banned: boolean;

  @Column({ default: 1 })
  priority: number;

  @OneToMany(() => Character, (character) => character.user)
  characters: Character[];
}
