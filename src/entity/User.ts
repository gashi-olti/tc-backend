import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTime } from 'luxon';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public uuid: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public email: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ default: 'user' })
  public role: string;

  @Column()
  public rememberMeToken?: string;

  @Column()
  public verificationToken: string | null;

  @Column({ type: 'datetime' })
  public verificationCreatedAt: DateTime | null;

  @CreateDateColumn()
  public createdAt: DateTime;

  @UpdateDateColumn()
  public updatedAt: DateTime;

  public isTokenInvalid(): boolean {
    return (
      !this.verificationCreatedAt || DateTime.utc().minus({ days: 2 }) > this.verificationCreatedAt
    );
  }
}
