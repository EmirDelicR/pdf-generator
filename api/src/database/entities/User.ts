import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { signToken } from 'src/utils/token';
import { DBTableNames, Roles } from 'src/utils/constants/db';
import { hashPassword } from 'src/utils/password';
import { Subscription } from './Subscription';

@Entity(DBTableNames.USER)
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: Roles.USER })
  role!: number;

  @Column({ default: null })
  age!: number;

  @Column({ default: null })
  avatar!: string;

  @Column({ default: null })
  firstName!: string;

  @Column({ default: null })
  lastName!: string;

  @Column({ default: null })
  userName!: string;

  @Column()
  token!: string;

  @Column({ default: false })
  loggedIn!: boolean;

  @Column({ default: false })
  profileUpdated!: boolean;

  @Column({ default: false })
  subscribed!: boolean;

  @BeforeInsert()
  async createPassword() {
    this.password = await hashPassword(this.password);
  }
  @BeforeInsert()
  async createToken() {
    this.token = signToken(this.password, this.email);
  }

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  toResponse(): Partial<User> {
    const user = new User();
    user.id = this.id;
    user.email = this.email;
    user.role = this.role;
    user.createdAt = this.createdAt;
    user.updatedAt = this.updatedAt;
    user.age = this.age;
    user.avatar = this.avatar;
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.userName = this.userName;
    user.token = this.token;
    user.loggedIn = this.loggedIn;
    user.profileUpdated = this.profileUpdated;
    user.subscribed = this.subscribed;
    // TODO @ed add subscription list here
    return user;
  }
}
