import GraphQLJSON from 'graphql-type-json';
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
export class Custom extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  characterId: number;

  @Field()
  @Column({ default: 'mp_m_freemode_01' })
  model!: string;

  @Field(() => GraphQLJSON)
  @Column({ type: 'jsonb', nullable: true })
  custom: JSON;

  @Field(() => GraphQLJSON)
  @Column({ type: 'jsonb', nullable: true })
  clothes: JSON;

  @JoinColumn()
  @OneToOne(() => Character, { onDelete: 'CASCADE' })
  character: Character;
}
