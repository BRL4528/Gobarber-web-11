import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import SubGoal from '@modules/sub_goals/infra/typeorm/entities/SubGoal';
import Sector from '@modules/sectors/infra/typeorm/entities/Sector';

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

  // @OneToMany(() => SubGoal, subGoal => subGoal.goals, { eager: true })
  // @JoinTable()
  // sub_goals: SubGoal[];

  @ManyToOne(() => Sector, sector => sector.goals)
  @JoinColumn({ name: 'sector_id' })
  sector: Sector;

  @Column()
  sector_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Goal;
