import { uuid } from 'uuidv4';

import IGoalsRepository from '@modules/goals/repositories/IGoalsRepository';
import ICreateGoalDTO from '@modules/goals/dtos/ICreateGoalDTO';

import Goal from '@modules/goals/infra/typeorm/entities/Goal';

class FakeGoalsRepository implements IGoalsRepository {
  private goals: Goal[] = [];

  public async findAll(): Promise<Goal[]> {
    const findGoals = this.goals.filter(goal => goal);

    return findGoals;
  }

  public async findById(id: string): Promise<Goal | undefined> {
    const findGoal = this.goals.find(goal => goal.id === id);

    return findGoal;
  }

  public async findByName(name: string): Promise<Goal | undefined> {
    const findGoal = this.goals.find(goal => goal.name === name);

    return findGoal;
  }

  public async create(goalData: ICreateGoalDTO): Promise<Goal> {
    const goal = new Goal();

    Object.assign(goal, { id: uuid() }, goalData);

    this.goals.push(goal);

    return goal;
  }

  public async save(goal: Goal): Promise<Goal> {
    const findIndex = this.goals.findIndex(findGoal => findGoal.id === goal.id);

    this.goals[findIndex] = goal;

    return goal;
  }
}

export default FakeGoalsRepository;
