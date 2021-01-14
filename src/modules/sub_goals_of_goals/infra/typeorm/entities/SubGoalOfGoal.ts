import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Goal from '@modules/goals/infra/typeorm/entities/Goal';
import SubGoal from '@modules/sub_goals/infra/typeorm/entities/SubGoal';

@Entity('sub_goals_of_goals')
class SubGoalOfGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SubGoal, subGoal => subGoal.sub_goal, { eager: true })
  @JoinColumn({ name: 'sub_goal_id' })
  sub_goals: SubGoal[];

  @ManyToOne(() => Goal, goal => goal.sub_goals_of_goals)
  @JoinColumn({ name: 'goal_id' })
  goal: Goal;

  @Column()
  sub_goal_id: string;

  @Column()
  goal_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SubGoalOfGoal;
