import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AAddGoalIdToResultsOfSubGoals1612827904200
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'results_of_sub_goals',
      new TableColumn({
        name: 'goal_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'results_of_sub_goals',
      new TableForeignKey({
        name: 'GoalResultOfSubGoal',
        referencedTableName: 'goals',
        referencedColumnNames: ['id'],
        columnNames: ['goal_id'],
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'results_of_sub_goals',
      'GoalResultOfSubGoal',
    );

    await queryRunner.dropColumn('results_of_sub_goals', 'goal_id');
  }
}
