import { GraphQLJSON } from 'graphql-type-json';
import { Field, Int } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Character } from './Character';

@Entity()
export class Vehicle extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  ownerId: number;

  @Field()
  @Column()
  plate: string;

  @Field(() => Int)
  @Column({ default: 100 })
  fuel: number;

  @Field(() => Int)
  @Column({ default: 100 })
  body: number;

  @Field(() => Int)
  @Column({ default: 100 })
  engine: number;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column('simple-array')
  lastCoords: number[];

  @Field(() => GraphQLJSON, { nullable: true })
  @Column('simple-array')
  tires: boolean[];

  @Field(() => GraphQLJSON, { nullable: true })
  @Column('simple-array')
  windows: boolean[];

  @Field(() => GraphQLJSON, { nullable: true })
  @Column('simple-array')
  doors: boolean[];

  @JoinColumn()
  @ManyToOne(() => Character, { onDelete: 'CASCADE' })
  owner: Character;
}
