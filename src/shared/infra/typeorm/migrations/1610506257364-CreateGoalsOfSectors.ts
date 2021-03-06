import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateGoalsOfSectors1610506257364
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'goals_of_sectors',
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
            name: 'sector_id',
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
            name: 'GoalSector',
            referencedTableName: 'goals',
            referencedColumnNames: ['id'],
            columnNames: ['goal_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            name: 'SectorGoal',
            referencedTableName: 'sectors',
            referencedColumnNames: ['id'],
            columnNames: ['sector_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('goals_of_sectors');
  }
}
