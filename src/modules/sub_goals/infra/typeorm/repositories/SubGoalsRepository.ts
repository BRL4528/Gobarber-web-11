import { getRepository, Repository } from 'typeorm';

import ISubGoalsRepository from '@modules/sub_goals/repositories/ISubGoalsRepository';
import ICreateSubGoalDTO from '@modules/sub_goals/dtos/ICreateSubGoalDTO';

import SubGoal from '@modules/sub_goals/infra/typeorm/entities/SubGoal';

class SubGoalsRepository implements ISubGoalsRepository {
  private ormRepository: Repository<SubGoal>;

  constructor() {
    this.ormRepository = getRepository(SubGoal);
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

  public async create(subGoalData: ICreateSubGoalDTO): Promise<SubGoal> {
    const subGoal = this.ormRepository.create(subGoalData);

    await this.ormRepository.save(subGoal);

    return subGoal;
  }

  public async save(subGoal: SubGoal): Promise<SubGoal> {
    return this.ormRepository.save(subGoal);
  }
}

export default SubGoalsRepository;
