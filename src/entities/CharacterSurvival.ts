import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CharacterSurvival extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  lastCoords: number[];

  @Column({ default: 200 })
  health: number;

  @Column({ default: 0 })
  armour: number;
}
