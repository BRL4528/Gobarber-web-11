import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Goal from '@modules/goals/infra/typeorm/entities/Goal';
import Sector from '@modules/sectors/infra/typeorm/entities/Sector';

@Entity('goals_of_sectors')
class GoalOfSector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Sector, sector => sector.goals_of_sectors, { eager: true })
  @JoinColumn({ name: 'sector_id' })
  sector: Sector;

  @ManyToOne(() => Goal, goal => goal.goal, { eager: true })
  @JoinColumn({ name: 'goal_id' })
  goals: Goal[];

  @Column()
  goal_id: string;

  @Column()
  sector_id: string;

  @Column('boolean')
  status_of_conclusion: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GoalOfSector;
