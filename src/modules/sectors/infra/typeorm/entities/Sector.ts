import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import GoalOfSector from '@modules/goals_of_sectors/infra/typeorm/entities/GoalOfSector';
import ResultOfSubGoal from '@modules/results_of_sub_goals/infra/typeorm/entities/ResultOfSubGoal';

@Entity('sectors')
class Sector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  leader: string;

  @OneToMany(() => GoalOfSector, goalOfSector => goalOfSector.sector)
  @JoinTable()
  goals_of_sectors: GoalOfSector[];

  @OneToMany(() => ResultOfSubGoal, resultOfSubGoal => resultOfSubGoal.sector, {
    eager: true,
  })
  @JoinTable()
  result_of_sub_goal: ResultOfSubGoal;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sector;
