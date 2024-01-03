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
    const responseUser = new User();
    responseUser.id = this.id;
    responseUser.email = this.email;
    responseUser.role = this.role;
    responseUser.createdAt = this.createdAt;
    responseUser.updatedAt = this.updatedAt;
    responseUser.age = this.age;
    responseUser.avatar = this.avatar;
    responseUser.firstName = this.firstName;
    responseUser.lastName = this.lastName;
    responseUser.userName = this.userName;
    responseUser.token = this.token;
    responseUser.loggedIn = this.loggedIn;
    responseUser.profileUpdated = this.profileUpdated;
    responseUser.subscribed = this.subscribed;
    // TODO @ed add subscription list here
    return responseUser;
  }
}
