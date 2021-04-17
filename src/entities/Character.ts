import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
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

  @OneToMany(() => Vehicle, (vehicle) => vehicle.owner)
  vehicles: Vehicle[];

  @ManyToOne(() => User, (user) => user.characters, { onDelete: 'CASCADE' })
  user: User;
}
