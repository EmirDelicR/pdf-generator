import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DBTableNames } from 'src/utils/constants/db';
export class Role1704362658157 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DBTableNames.ROLE,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'type',
            type: 'number',
            isNullable: false,
            isUnique: true
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DBTableNames.ROLE);
  }
}
