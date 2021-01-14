import { uuid } from 'uuidv4';

import ISubGoalsRepository from '@modules/sub_goals/repositories/ISubGoalsRepository';
import ICreateSubGoalDTO from '@modules/sub_goals/dtos/ICreateSubGoalDTO';

import SubGoal from '@modules/sub_goals/infra/typeorm/entities/SubGoal';

class FakeSubGoalsRepository implements ISubGoalsRepository {
  private subGoals: SubGoal[] = [];

  public async findAll(): Promise<SubGoal[] | undefined> {
    const findSubGoals = this.subGoals.filter(subGoal => subGoal);

    return findSubGoals;
  }

  public async findById(id: string): Promise<SubGoal | undefined> {
    const findSubGoal = this.subGoals.find(subGoal => subGoal.id === id);

    return findSubGoal;
  }

  public async findByName(name: string): Promise<SubGoal | undefined> {
    const findSubGoal = this.subGoals.find(subGoal => subGoal.name === name);

    return findSubGoal;
  }

  public async create(subGoalData: ICreateSubGoalDTO): Promise<SubGoal> {
    const subGoal = new SubGoal();

    Object.assign(subGoal, { id: uuid() }, subGoalData);

    this.subGoals.push(subGoal);

    return subGoal;
  }

  public async save(subGoal: SubGoal): Promise<SubGoal> {
    const findIndex = this.subGoals.findIndex(
      findSubGoal => findSubGoal.id === subGoal.id,
    );

    this.subGoals[findIndex] = subGoal;

    return subGoal;
  }
}

export default FakeSubGoalsRepository;
