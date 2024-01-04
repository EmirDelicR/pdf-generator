import { MigrationInterface, QueryRunner } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

import Console from 'src/utils/logger';
import { Roles } from 'src/utils/constants/db';
export class SeedAdminUser1704278255526 implements MigrationInterface {
  public async up(_queryRunner: QueryRunner): Promise<void> {
    const repo = AppDataSource.getRepository(User);
    const userData = new User();

    userData.email = 'admin@emir.local';
    userData.firstName = 'John';
    userData.lastName = 'Doo';
    userData.role = Roles.ADMIN;
    userData.password = 'password123';
    userData.loggedIn = false;
    userData.profileUpdated = false;
    userData.subscribed = false;

    const user = repo.create(userData);
    await repo.save(user);
    Console.info('Admin user saved to DB.');
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOneBy({
      email: 'admin@emir.local'
    });

    if (user) {
      await repo.remove(user);
    }
  }
}
