import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddSubGoalIdToGoals1610075294938
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'goals',
      new TableColumn({
        name: 'sub_goal_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'goals',
      new TableForeignKey({
        name: 'SubGoalsGoal',
        columnNames: ['sub_goal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sub_goals',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('goals', 'SubGoalsGoal');

    await queryRunner.dropColumn('goals', 'sub_goal_id');
  }
}
