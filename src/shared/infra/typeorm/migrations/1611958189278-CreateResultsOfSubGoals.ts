import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateResultsOfSubGoals1611958189278
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'results_of_sub_goals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'result',
            type: 'boolean',
          },
          {
            name: 'sub_goal_id',
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
            name: 'ResultSubGoal',
            referencedTableName: 'sub_goals',
            referencedColumnNames: ['id'],
            columnNames: ['sub_goal_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('results_of_sub_goals');
  }
}
