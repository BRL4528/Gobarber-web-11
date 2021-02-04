import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import AnalyzeModuleOfGoal from '@modules/analysis_module_of_goals/infra/typeorm/entities/AnalyzeModuleOfGoal';

@Entity('analysis_module')
class AnalysisModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  responsible: string;

  @Column()
  observations: string;

  @Column()
  condition: string;

  // @OneToMany(() => SubGoalOfGoal, subGoalOfGoal => subGoalOfGoal.sub_goals)
  // @JoinTable()
  // sub_goal: SubGoalOfGoal[];

  @OneToMany(
    () => AnalyzeModuleOfGoal,
    analyzeModuleOfGoal => analyzeModuleOfGoal.analysis_module,
  )
  @JoinTable()
  analyze_module_of_goal: AnalyzeModuleOfGoal;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AnalysisModule;
