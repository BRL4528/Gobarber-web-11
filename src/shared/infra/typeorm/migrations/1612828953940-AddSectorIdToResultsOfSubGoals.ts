import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddSectorIdToResultsOfSubGoals1612828953940
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'results_of_sub_goals',
      new TableColumn({
        name: 'sector_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'results_of_sub_goals',
      new TableForeignKey({
        name: 'SectorResultOfSubGoal',
        referencedTableName: 'sectors',
        referencedColumnNames: ['id'],
        columnNames: ['sector_id'],
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'results_of_sub_goals',
      'SectorResultOfSubGoal',
    );

    await queryRunner.dropColumn('results_of_sub_goals', 'sector_id');
  }
}
