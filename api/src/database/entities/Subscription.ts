import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { DBTableNames } from 'src/utils/constants/db';

@Entity(DBTableNames.SUBSCRIPTION)
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  toResponse(): Subscription {
    const subscription = new Subscription();
    subscription.id = this.id;
    subscription.name = this.name;

    return subscription;
  }
}
