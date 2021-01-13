import { getRepository, In, Repository } from 'typeorm';

import ISubGoalsRepository from '@modules/sub_goals/repositories/ISubGoalsRepository';
import ICreateSubGoalDTO from '@modules/sub_goals/dtos/ICreateSubGoalDTO';

import SubGoal from '@modules/sub_goals/infra/typeorm/entities/SubGoal';

class SubGoalsRepository implements ISubGoalsRepository {
  private ormRepository: Repository<SubGoal>;

  constructor() {
    this.ormRepository = getRepository(SubGoal);
  }

  public async findAllByIdSubGoals(goalsIds: string[]): Promise<SubGoal[]> {
    const subGoals = await this.ormRepository.find({
      where: {
        goal_ids: In(goalsIds),
      },
    });

    return subGoals;
  }

  public async findAll(): Promise<SubGoal[] | undefined> {
    const subGoals = await this.ormRepository.find();

    return subGoals;
  }

  public async findById(id: string): Promise<SubGoal | undefined> {
    const subGoal = await this.ormRepository.findOne(id);

    return subGoal;
  }

  public async findByName(name: string): Promise<SubGoal | undefined> {
    const subGoal = await this.ormRepository.findOne({
      where: { name },
    });

    return subGoal;
  }

  public async create({
    name,
    status,
    weight,
    goals,
  }: ICreateSubGoalDTO): Promise<SubGoal> {
    const subGoal = this.ormRepository.create({
      name,
      status,
      weight,
      goal_ids: goals,
    });

    await this.ormRepository.save(subGoal);

    return subGoal;
  }

  public async save(subGoal: SubGoal): Promise<SubGoal> {
    return this.ormRepository.save(subGoal);
  }
}

export default SubGoalsRepository;
