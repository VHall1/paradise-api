import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CharacterSurvival } from './CharacterSurvival';
import { User } from './User';
import { Bank } from './Bank';
import { Vehicle } from './Vehicle';

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

  @OneToMany(() => Vehicle, (vehicle) => vehicle.owner)
  vehicles: Vehicle;

  @JoinColumn()
  @OneToOne(() => CharacterSurvival)
  characterSurvival: CharacterSurvival;

  @JoinColumn()
  @OneToOne(() => Bank)
  bank: Bank;
}
