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

@Entity('sub_goals')
class SubGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  weight: string;

  // @ManyToOne(() => Goal, goal => goal.sub_goals)
  // @JoinColumn({ name: 'goal_id' })
  // goals: Goal[];

  @Column('simple-array')
  goal_ids: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SubGoal;
