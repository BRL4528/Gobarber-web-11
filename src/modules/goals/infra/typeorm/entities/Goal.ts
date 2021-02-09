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
import GoalOfSector from '@modules/goals_of_sectors/infra/typeorm/entities/GoalOfSector';
import AnalyzeModuleOfGoal from '@modules/analysis_module_of_goals/infra/typeorm/entities/AnalyzeModuleOfGoal';
import ResultOfSubGoal from '@modules/results_of_sub_goals/infra/typeorm/entities/ResultOfSubGoal';

@Entity('goals')
class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column('decimal')
  weight: number;

  @Column('decimal')
  source: number;

  @Column()
  observations: string;

  @Column()
  type: string;

  @OneToMany(() => GoalOfSector, goalOfSector => goalOfSector.goals)
  @JoinTable()
  goal: GoalOfSector[];

  @OneToMany(() => SubGoalOfGoal, subGoalOfGoal => subGoalOfGoal.goal, {
    eager: true,
  })
  @JoinTable()
  sub_goals_of_goals: SubGoalOfGoal[];

  @OneToMany(
    () => AnalyzeModuleOfGoal,
    analyzeModuleOfGoal => analyzeModuleOfGoal.goal,
  )
  @JoinTable()
  analyze_module_of_goal: AnalyzeModuleOfGoal;

  @OneToMany(() => ResultOfSubGoal, resultOfSubGoal => resultOfSubGoal.goal, {
    eager: true,
  })
  @JoinTable()
  result_of_sub_goal: ResultOfSubGoal;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Goal;
