import { getRepository, Repository } from 'typeorm';

import IGoalsRepository from '@modules/goals/repositories/IGoalsRepository';
import ICreateGoalDTO from '@modules/goals/dtos/ICreateGoalDTO';

import Goal from '@modules/goals/infra/typeorm/entities/Goal';

// interface IFindGoals {
//   id: string;
// }

class GoalsRepository implements IGoalsRepository {
  private ormRepository: Repository<Goal>;

  constructor() {
    this.ormRepository = getRepository(Goal);
  }

  public async findAll(): Promise<Goal[]> {
    const goals = await this.ormRepository.find();

    return goals;
  }

  // public async findAllById(goals: IFindGoals[]): Promise<Goal[]> {
  //   console.log(goals);
  //   const goalsIds = goals.map(goal => goal.id);

  //   const existsGoals = await this.ormRepository.find({
  //     where: {
  //       id: In(goalsIds),
  //     },
  //   });

  //   return existsGoals;
  // }

  public async findById(id: string): Promise<Goal | undefined> {
    const goal = await this.ormRepository.findOne(id);

    return goal;
  }

  public async findByName(name: string): Promise<Goal | undefined> {
    const goal = await this.ormRepository.findOne({
      where: { name },
    });

    return goal;
  }

  public async create({
    // sub_goals,
    name,
    status,
    weight,
  }: ICreateGoalDTO): Promise<Goal> {
    const goal = this.ormRepository.create({
      name,
      status,
      weight,
      // sub_goals,
    });

    await this.ormRepository.save(goal);

    return goal;
  }

  public async save(goal: Goal): Promise<Goal> {
    return this.ormRepository.save(goal);
  }
}

export default GoalsRepository;
