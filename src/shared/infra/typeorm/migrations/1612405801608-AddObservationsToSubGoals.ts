import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddObservationsToSubGoals1612405801608
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sub_goals',
      new TableColumn({
        name: 'observations',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sub_goals', 'observations');
  }
}
