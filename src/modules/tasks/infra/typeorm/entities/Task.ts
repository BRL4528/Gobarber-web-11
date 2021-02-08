import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import TaskOfSubGoal from '@modules/tasks_of_sub_goals/infra/typeorm/entities/TaskOfSubGoal';
// import GoalOfSector from '@modules/goals_of_sectors/infra/typeorm/entities/GoalOfSector';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  weight: number;

  @Column()
  observations: string;

  @OneToMany(() => TaskOfSubGoal, taskOfSubGoal => taskOfSubGoal.task, {
    eager: true,
  })
  @JoinTable()
  tasks_of_sub_goals: TaskOfSubGoal[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Task;
