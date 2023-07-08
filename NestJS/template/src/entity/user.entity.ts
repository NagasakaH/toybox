import {Entity, Column, PrimaryGeneratedColumn, Generated} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column({length: 255})
  name: string;

  @Column({length: 255})
  email: string;

  @Column({type: 'timestamp', nullable: true, default: null})
  lastLoggedIn: number | null; // タイムスタンプ(UTC)
}
