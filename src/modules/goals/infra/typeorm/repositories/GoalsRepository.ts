import { getRepository, Repository } from 'typeorm';

import IGoalsRepository from '@modules/goals/repositories/IGoalsRepository';
import ICreateGoalDTO from '@modules/goals/dtos/ICreateGoalDTO';

import Goal from '@modules/goals/infra/typeorm/entities/Goal';

class GoalsRepository implements IGoalsRepository {
  private ormRepository: Repository<Goal>;

  constructor() {
    this.ormRepository = getRepository(Goal);
  }

  public async findAll(): Promise<Goal[]> {
    const goals = await this.ormRepository.find();

    return goals;
  }

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

  public async create({ name, status, weight }: ICreateGoalDTO): Promise<Goal> {
    const goal = this.ormRepository.create({
      name,
      status,
      weight,
    });

    await this.ormRepository.save(goal);

    return goal;
  }

  public async save(goal: Goal): Promise<Goal> {
    return this.ormRepository.save(goal);
  }
}

export default GoalsRepository;
