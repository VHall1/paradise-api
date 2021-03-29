import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  steam: string;

  @Column()
  discord: string;

  @Column()
  whitelisted: boolean;

  @Column()
  banned: boolean;

  @Column()
  priority: number;
}
