import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from './Character';

@ObjectType()
@Entity()
export class Bank extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => Int)
  @Column({ default: 500 })
  wallet: number;

  @Field(() => Int)
  @Column({ default: 4500 })
  bank: number;

  @Field(() => Int)
  @Column()
  characterId: number;

  @JoinColumn()
  @OneToOne(() => Character, { onDelete: 'CASCADE' })
  character: Character;
}
