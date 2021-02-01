import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinTable,
  // OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// import SubGoalOfGoal from '@modules/sub_goals_of_goals/infra/typeorm/entities/SubGoalOfGoal';
// import GoalOfSector from '@modules/goals_of_sectors/infra/typeorm/entities/GoalOfSector';

@Entity('results_of_sub_goals')
class ResultOfSubGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  result: string;

  // @OneToMany(() => GoalOfSector, goalOfSector => goalOfSector.goals)
  // @JoinTable()
  // goal: GoalOfSector[];

  // @OneToMany(() => SubGoalOfGoal, subGoalOfGoal => subGoalOfGoal.goal, {
  //   eager: true,
  // })
  // @JoinTable()
  // sub_goals_of_goals: SubGoalOfGoal[];

  @Column()
  sub_goal_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ResultOfSubGoal;
