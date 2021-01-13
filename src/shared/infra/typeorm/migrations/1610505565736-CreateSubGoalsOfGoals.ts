import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSubGoalsOfGoals1610505565736
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sub_goals_of_goals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'sub_goal_id',
            type: 'uuid',
          },
          {
            name: 'goal_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'SubGoalGoal',
            referencedTableName: 'sub_goals',
            referencedColumnNames: ['id'],
            columnNames: ['sub_goal_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'GoalSubGoal',
            referencedTableName: 'goals',
            referencedColumnNames: ['id'],
            columnNames: ['goal_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sub_goals_of_goals');
  }
}
