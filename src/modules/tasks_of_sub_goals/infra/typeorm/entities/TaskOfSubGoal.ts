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
import Task from '@modules/tasks/infra/typeorm/entities/Task';

@Entity('tasks_of_sub_goals')
class TaskOfSubGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Task, task => task.tasks_of_sub_goals)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => SubGoal, subGoal => subGoal.tasks_of_sub_goals)
  @JoinColumn({ name: 'sub_goal_id' })
  sub_goals: SubGoal;

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
