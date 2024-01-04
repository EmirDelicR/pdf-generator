import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DBTableNames } from 'src/utils/constants/db';
import { User } from './User';

@Entity(DBTableNames.SUBSCRIPTION)
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @ManyToOne(() => User, (user) => user.subscriptions)
  user!: User;

  toResponse(): Subscription {
    const subscription = new Subscription();
    subscription.id = this.id;
    subscription.name = this.name;

    return subscription;
  }
}
