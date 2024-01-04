import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DBTableNames, Roles } from 'src/utils/constants/db';
export class CreateUserTable1702801141568 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DBTableNames.USER,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'role',
            type: 'int',
            default: Roles.USER
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'now()',
            isNullable: true
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'now()',
            isNullable: true
          },
          {
            name: 'age',
            type: 'int',
            isNullable: true
          },
          {
            name: 'avatar',
            type: 'varchar',
            length: '255',
            isNullable: true
          },
          {
            name: 'firstName',
            type: 'varchar',
            length: '255',
            isNullable: true
          },
          {
            name: 'lastName',
            type: 'varchar',
            length: '255',
            isNullable: true
          },
          {
            name: 'userName',
            type: 'varchar',
            length: '255',
            isNullable: true
          },
          {
            name: 'token',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'loggedIn',
            type: 'boolean',
            isNullable: false
          },
          {
            name: 'profileUpdated',
            type: 'boolean',
            isNullable: false
          },
          {
            name: 'subscribed',
            type: 'boolean',
            isNullable: false
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DBTableNames.USER);
  }
}
