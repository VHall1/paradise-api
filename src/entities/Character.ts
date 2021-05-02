import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Character extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  surename!: string;

  @Field()
  @Column()
  birthdate!: string;

  @Field()
  @Column({ unique: true })
  phone!: string;

  @Field()
  @Column({ default: false })
  deleted!: boolean;

  @Field()
  @Index()
  @Column()
  userSteam: string;

  @ManyToOne(() => User, (user) => user.characters, { onDelete: 'CASCADE' })
  user: User;
}
