import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinColumn,
  // ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// import Goal from '@modules/goals/infra/typeorm/entities/Goal';
// import SubGoal from '@modules/sub_goals/infra/typeorm/entities/SubGoal';

@Entity('tasks_of_sub_goals')
class TaskOfSubGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Goal, goal => goal.sub_goals_of_goals)
  // @JoinColumn({ name: 'task_id' })
  // goal: Goal;

  // @ManyToOne(() => SubGoal, subGoal => subGoal.sub_goal, { eager: true })
  // @JoinColumn({ name: 'sub_goal_id' })
  // sub_goals: SubGoal[];

  @Column()
  task_id: string;

  @Column()
  sub_goal_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TaskOfSubGoal;
