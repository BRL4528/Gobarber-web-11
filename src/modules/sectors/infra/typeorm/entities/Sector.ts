import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Goal from '@modules/goals/infra/typeorm/entities/Goal';

@Entity('sectors')
class Sector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  leader: string;

  @OneToMany(() => Goal, goal => goal.sector, { eager: true })
  goals: Goal[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sector;
