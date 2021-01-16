import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// import GoalOfSector from '@modules/goals_of_sectors/infra/typeorm/entities/GoalOfSector';

@Entity('employees')
class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  salary: string;

  @Column()
  sector: string;

  // @OneToMany(() => GoalOfSector, goalOfSector => goalOfSector.sector, {
  //   eager: true,
  // })
  // @JoinTable()
  // goals_of_sectors: GoalOfSector[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Employee;
