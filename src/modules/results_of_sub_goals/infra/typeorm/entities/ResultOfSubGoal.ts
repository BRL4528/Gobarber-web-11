import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import SubGoal from '@modules/sub_goals/infra/typeorm/entities/SubGoal';
import Goal from '@modules/goals/infra/typeorm/entities/Goal';
import Sector from '@modules/sectors/infra/typeorm/entities/Sector';

@Entity('results_of_sub_goals')
class ResultOfSubGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  result: string;

  @ManyToOne(() => SubGoal, subGoal => subGoal.result_of_sub_goal)
  @JoinColumn({ name: 'sub_goal_id' })
  sub_goal: SubGoal;

  @ManyToOne(() => Goal, goal => goal.result_of_sub_goal)
  @JoinColumn({ name: 'goal_id' })
  goal: Goal;

  @ManyToOne(() => Sector, sector => sector.result_of_sub_goal)
  @JoinColumn({ name: 'sector_id' })
  sector: Sector;

  @Column()
  sub_goal_id: string;

  @Column()
  goal_id: string;

  @Column()
  sector_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ResultOfSubGoal;
