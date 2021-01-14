import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  // JoinColumn,
  // ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import SubGoalOfGoal from '@modules/sub_goals_of_goals/infra/typeorm/entities/SubGoalOfGoal';
// import Goal from '@modules/goals/infra/typeorm/entities/Goal';

@Entity('sub_goals')
class SubGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  weight: string;

  // @ManyToOne(() => Goal, goal => goal.sub_goals)
  // @JoinColumn({ name: 'goal_id' })
  // goals: Goal[];

  @OneToMany(() => SubGoalOfGoal, subGoalOfGoal => subGoalOfGoal.sub_goals)
  @JoinTable()
  sub_goal: SubGoalOfGoal[];

  @Column('simple-array')
  goal_ids: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SubGoal;
