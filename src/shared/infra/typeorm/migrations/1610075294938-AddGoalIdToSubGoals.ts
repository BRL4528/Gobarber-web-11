import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddGoalIdToSubGoals1610075294938
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sub_goals',
      new TableColumn({
        name: 'goal_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'sub_goals',
      new TableForeignKey({
        name: 'GoalSubGoals',
        columnNames: ['goal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'goals',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sub_goals', 'GoalSubGoals');

    await queryRunner.dropColumn('sub_goals', 'goal_id');
  }
}
