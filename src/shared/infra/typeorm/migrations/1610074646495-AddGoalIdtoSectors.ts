import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddGoalIdtoSectors1610074646495
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sectors',
      new TableColumn({
        name: 'goal_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'sectors',
      new TableForeignKey({
        name: 'GoalsSector',
        columnNames: ['goal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'goals',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sectors', 'GoalsSector');

    await queryRunner.dropColumn('sectors', 'goal_id');
  }
}
