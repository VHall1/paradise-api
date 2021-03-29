import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  steam: string;

  @Column({ unique: true })
  discord: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ default: false })
  whitelisted: boolean;

  @Column({ default: false })
  banned: boolean;

  @Column({ default: 1 })
  priority: number;
}
