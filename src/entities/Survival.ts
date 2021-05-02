import { GraphQLJSON } from 'graphql-type-json';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Character } from './Character';

@ObjectType()
@Entity()
export class Survival extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  characterId: number;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column('simple-array', { nullable: true })
  lastCoords: number[];

  @Field(() => Int)
  @Column({ default: 200 })
  health: number;

  @Field(() => Int)
  @Column({ default: 0 })
  armour: number;

  @JoinColumn()
  @OneToOne(() => Character, { onDelete: 'CASCADE' })
  character: Character;
}
