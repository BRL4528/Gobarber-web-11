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

@Entity('results_of_sub_goals')
class ResultOfSubGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  result: string;

  @ManyToOne(() => SubGoal, subGoal => subGoal.result_of_sub_goal)
  @JoinColumn({ name: 'sub_goal_id' })
  sub_goal: SubGoal;

  @Column()
  sub_goal_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ResultOfSubGoal;
