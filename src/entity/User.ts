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
  @PrimaryGeneratedColumn('rowid')
  public id: string;

  @Column('uuid')
  public uuid: string;

  @Column('character varying', { nullable: false, unique: true })
  public email: string;

  @Column('character varying', { nullable: false })
  public password: string;

  @Column('character varying', { name: 'remember_me_token', length: 32 })
  public rememberMeToken?: string;

  @Column('character varying', { name: 'verification_token', nullable: true, length: 255 })
  public verificationToken: string | null;

  @Column({ name: 'verification_created_at', type: 'timestamp', nullable: true })
  public verificationCreatedAt: DateTime | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  public createdAt: DateTime;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  public updatedAt: DateTime;

  // TODO: Add roles column?

  public isTokenInvalid(): boolean {
    return (
      !this.verificationCreatedAt || DateTime.utc().minus({ days: 2 }) > this.verificationCreatedAt
    );
  }
}
