import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: number;

  @Column({length: 255})
  name: string;

  @Column({length: 255})
  email: string;

  @UpdateDateColumn({type: 'timestamp', nullable: true, default: null})
  lastLoggedIn: number; // タイムスタンプ(UTC)
}
