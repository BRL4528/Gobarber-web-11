import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTypeToGoals1612393879705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'goals',
      new TableColumn({
        name: 'type',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('goals', 'type');
  }
}
