import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFiles1612641712293 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
