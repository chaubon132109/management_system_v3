import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, AfterLoad, AfterInsert, AfterUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}