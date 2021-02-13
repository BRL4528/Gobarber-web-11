import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddStatusOfConclusionToGoalsOfSectors1613238801190
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'goals_of_sectors',
      new TableColumn({
        name: 'status_of_conclusion',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('goals_of_sectors', 'status_of_conclusion');
  }
}
