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
// import Sector from '@modules/sectors/infra/typeorm/entities/Sector';

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
