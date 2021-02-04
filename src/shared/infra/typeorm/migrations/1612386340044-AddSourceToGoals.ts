import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddSourceToGoals1612386340044
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'goals',
      new TableColumn({
        name: 'source',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('goals', 'source');
  }
}
