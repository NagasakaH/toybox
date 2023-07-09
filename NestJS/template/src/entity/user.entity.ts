import {Exclude} from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  Unique,
} from 'typeorm';

@Entity('users')
@Unique(['email', 'accountType'])
export class User {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  userId: number;

  @Column({length: 255})
  name: string;

  @Column({length: 255})
  email: string;

  @Exclude()
  @Column()
  hashedPassword: string;

  @Column({length: 255})
  accountType: string;

  @Column({type: 'timestamp', nullable: true, default: null})
  lastLoggedIn: number | null; // タイムスタンプ(UTC)
}
