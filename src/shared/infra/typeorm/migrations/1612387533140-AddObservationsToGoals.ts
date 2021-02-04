import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddObservationsToGoals1612387533140
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'goals',
      new TableColumn({
        name: 'observations',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('goals', 'observations');
  }
}
