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
  sub_goal: SubGoalOfGoal[];

  @OneToMany(
    () => ResultOfSubGoal,
    resultOfSubGoal => resultOfSubGoal.sub_goal,
    {
      eager: true,
    },
  )
  @JoinTable()
  result_of_sub_goal: ResultOfSubGoal;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SubGoal;
