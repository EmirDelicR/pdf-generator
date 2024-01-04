import { MigrationInterface, QueryRunner } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Subscription } from '../entities/Subscription';

import Console from 'src/utils/logger';

export class SeedSubscription1704360153151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repo = AppDataSource.getRepository(Subscription);
    const subscriptionNews = new Subscription();
    subscriptionNews.name = 'news';

    const subscriptionCode = new Subscription();
    subscriptionCode.name = 'code';

    const subscriptionGeneral = new Subscription();
    subscriptionGeneral.name = 'general';

    const news = repo.create(subscriptionNews);
    const code = repo.create(subscriptionCode);
    const general = repo.create(subscriptionGeneral);

    await repo.save(news);
    Console.info('News subscription saved to DB.');
    await repo.save(code);
    Console.info('Code subscription saved to DB.');
    await repo.save(general);
    Console.info('General subscription saved to DB.');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
