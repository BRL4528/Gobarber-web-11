import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAnalysisModuleOfGoals1611949382579
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'analysis_module_of_goals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'goal_id',
            type: 'uuid',
          },
          {
            name: 'analyze_module_id',
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
            name: 'GoalAnalyzeModule',
            referencedTableName: 'goals',
            referencedColumnNames: ['id'],
            columnNames: ['goal_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            name: 'AnalyzeModuleGoal',
            referencedTableName: 'analysis_module',
            referencedColumnNames: ['id'],
            columnNames: ['analyze_module_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('analysis_module_of_goals');
  }
}
