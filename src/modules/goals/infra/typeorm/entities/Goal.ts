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
// import Sector from '@modules/sectors/infra/typeorm/entities/Sector';

@Entity('goals')
class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  weight: string;

  @OneToMany(() => GoalOfSector, goalOfSector => goalOfSector.goals)
  @JoinTable()
  goal: GoalOfSector[];

  @OneToMany(() => SubGoalOfGoal, subGoalOfGoal => subGoalOfGoal.goal, {
    eager: true,
  })
  @JoinTable()
  sub_goals_of_goals: SubGoalOfGoal[];

  // @ManyToOne(() => Sector, sector => sector.goals)
  // @JoinColumn({ name: 'sector_id' })
  // sector: Sector;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Goal;
