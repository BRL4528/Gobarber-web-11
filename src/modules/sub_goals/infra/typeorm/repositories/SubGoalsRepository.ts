import { getRepository, In, Repository } from 'typeorm';

import ISubGoalsRepository from '@modules/sub_goals/repositories/ISubGoalsRepository';
import ICreateSubGoalDTO from '@modules/sub_goals/dtos/ICreateSubGoalDTO';

import SubGoal from '@modules/sub_goals/infra/typeorm/entities/SubGoal';

class SubGoalsRepository implements ISubGoalsRepository {
  private ormRepository: Repository<SubGoal>;

  constructor() {
    this.ormRepository = getRepository(SubGoal);
  }

  public async findAllByName(
    subGoals: ICreateSubGoalDTO[],
  ): Promise<SubGoal[]> {
    const subGoalsNames = subGoals.map(sub_goal => sub_goal.name);

    const existsSubGoals = await this.ormRepository.find({
      where: {
        name: In(subGoalsNames),
      },
    });

    return existsSubGoals;
  }

  public async findAll(): Promise<SubGoal[]> {
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

  public async createAll(subGoals: ICreateSubGoalDTO[]): Promise<SubGoal[]> {
    const subGoalsAll = this.ormRepository.create(
      subGoals.map(subGoal => ({
        name: subGoal.name,
        status: subGoal.status,
        weight: subGoal.weight,
        observations: subGoal.observations,
      })),
    );

    await this.ormRepository.save(subGoalsAll);

    return subGoalsAll;
  }

  public async create({
    name,
    status,
    weight,
    observations,
  }: ICreateSubGoalDTO): Promise<SubGoal> {
    const subGoal = this.ormRepository.create({
      name,
      status,
      weight,
      observations,
    });

    await this.ormRepository.save(subGoal);

    return subGoal;
  }

  public async save(subGoal: SubGoal): Promise<SubGoal> {
    return this.ormRepository.save(subGoal);
  }
}

export default SubGoalsRepository;
