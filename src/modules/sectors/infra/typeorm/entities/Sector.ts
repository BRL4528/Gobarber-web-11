import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import GoalOfSector from '@modules/goals_of_sectors/infra/typeorm/entities/GoalOfSector';

@Entity('sectors')
class Sector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  leader: string;

  @OneToMany(() => GoalOfSector, goalOfSector => goalOfSector.sector)
  @JoinTable()
  goals_of_sectors: GoalOfSector[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sector;
