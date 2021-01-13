import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sub_goals_of_goals')
class SubGoalOfGoal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sub_goal_id: string;

  @Column()
  goal_id: string;

  // @ManyToOne(() => Goal, goal => goal.sub_goals)
  // @JoinColumn({ name: 'goal_id' })
  // goals: Goal[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SubGoalOfGoal;
