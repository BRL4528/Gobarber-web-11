import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import AnalysisModule from '@modules/analysis_module/infra/typeorm/entities/AnalysisModule';
import Goal from '@modules/goals/infra/typeorm/entities/Goal';

@Entity('analysis_module_of_goals')
class AnalyzeModuleOfGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Goal, goal => goal.goal, { eager: true })
  // @JoinColumn({ name: 'goal_id' })
  // goals: Goal[];

  // @ManyToOne(() => Sector, sector => sector.goals_of_sectors)
  // @JoinColumn({ name: 'sector_id' })
  // sector: Sector;

  @ManyToOne(() => Goal, goal => goal.analyze_module_of_goal, { eager: true })
  @JoinColumn({ name: 'goal_id' })
  goal: Goal;

  @ManyToOne(
    () => AnalysisModule,
    analysisModule => analysisModule.analyze_module_of_goal,
    { eager: true },
  )
  @JoinColumn({ name: 'analyze_module_id' })
  analysis_module: AnalysisModule;

  @Column()
  goal_id: string;

  @Column()
  analyze_module_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AnalyzeModuleOfGoal;
