import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import SubGoalOfGoal from '@modules/sub_goals_of_goals/infra/typeorm/entities/SubGoalOfGoal';
import ResultOfSubGoal from '@modules/results_of_sub_goals/infra/typeorm/entities/ResultOfSubGoal';
import TaskOfSubGoal from '@modules/tasks_of_sub_goals/infra/typeorm/entities/TaskOfSubGoal';

@Entity('sub_goals')
class SubGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column('decimal')
  weight: number;

  @Column()
  observations: string;

  @OneToMany(() => SubGoalOfGoal, subGoalOfGoal => subGoalOfGoal.sub_goals)
  @JoinTable()
  sub_goals_of_goals: SubGoalOfGoal[];

  @OneToMany(
    () => ResultOfSubGoal,
    resultOfSubGoal => resultOfSubGoal.sub_goal,
    {
      eager: true,
    },
  )
  @JoinTable()
  result_of_sub_goal: ResultOfSubGoal;

  @OneToMany(() => TaskOfSubGoal, taskOfSubGoal => taskOfSubGoal.sub_goals, {
    eager: true,
  })
  @JoinTable()
  tasks_of_sub_goals: TaskOfSubGoal[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SubGoal;
