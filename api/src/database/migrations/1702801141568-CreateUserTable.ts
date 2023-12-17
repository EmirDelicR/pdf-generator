import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1702801141568 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
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
            name: 'userId',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false
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
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false
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

    await queryRunner.createForeignKey(
      'books',
      new TableForeignKey({
        columnNames: ['author_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'authors',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
