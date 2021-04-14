import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

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
}
