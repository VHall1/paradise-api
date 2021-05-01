import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from './Character';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  steam!: string;

  @Field()
  @Column({ unique: true })
  discord!: string;

  @Field()
  @Column({ default: false })
  admin!: boolean;

  @Field()
  @Column({ default: false })
  whitelisted!: boolean;

  @Field()
  @Column({ default: false })
  banned!: boolean;

  @Field()
  @Column({ default: 1 })
  priority!: number;

  @OneToMany(() => Character, (character) => character.user)
  characters: Character[];
}
