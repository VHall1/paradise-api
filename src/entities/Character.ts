import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { CharacterSurvival } from './CharacterSurvival';
import { User } from './User';
import { Bank } from './Bank';

@Entity()
export class Character extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surename: string;

  @Column()
  birthdate: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne(() => User, (user) => user.characters)
  user: User;

  @JoinColumn()
  @OneToOne(() => CharacterSurvival)
  characterSurvival: CharacterSurvival;

  @JoinColumn()
  @OneToOne(() => Bank)
  bank: Bank;
}
