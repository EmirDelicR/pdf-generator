import { MigrationInterface, QueryRunner } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

import Console from 'src/utils/logger';
import { Roles } from 'src/utils/constants/db';
import { Role } from '../entities/Role';

const EMAIL = 'admin@test.com';
export class SeedAdminUser1704278255526 implements MigrationInterface {
  public async up(_queryRunner: QueryRunner): Promise<void> {
    const userRepo = AppDataSource.getRepository(User);
    const roleRepo = AppDataSource.getRepository(Role);

    const role = (await roleRepo.findOneBy({ type: Roles.ADMIN })) as Role;
    const userData = new User();

    userData.email = EMAIL;
    userData.firstName = 'John';
    userData.lastName = 'Doo';
    userData.role = role;
    userData.password = 'password123';
    userData.loggedIn = false;
    userData.profileUpdated = false;
    userData.subscribed = false;

    const user = userRepo.create(userData);
    await userRepo.save(user);
    Console.info('Admin user saved to DB.');
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOneBy({
      email: EMAIL
    });

    if (user) {
      await repo.remove(user);
    }
  }
}
