import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  // TableForeignKey,
} from 'typeorm';

export default class AddSectorIdtoGoals1610074646495
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'goals',
      new TableColumn({
        name: 'sector_ids',
        type: 'varchar',
        isNullable: true,
      }),
    );

    // await queryRunner.createForeignKey(
    //   'goals',
    //   new TableForeignKey({
    //     name: 'SectorsGoal',
    //     columnNames: ['sector_id'],
    //     referencedColumnNames: ['id'],
    //     referencedTableName: 'sectors',
    //     onDelete: 'SET NULL',
    //     onUpdate: 'CASCADE',
    //   }),
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey('goals', 'SectorsGoal');

    await queryRunner.dropColumn('goals', 'sector_ids');
  }
}
