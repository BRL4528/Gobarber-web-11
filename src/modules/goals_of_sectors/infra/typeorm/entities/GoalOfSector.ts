import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('goals_of_sectors')
class GoalOfSector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  goal_id: string;

  @Column()
  sector_id: string;

  // @ManyToOne(() => Goal, goal => goal.sub_goals)
  // @JoinColumn({ name: 'goal_id' })
  // goals: Goal[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GoalOfSector;
