import { getRepository, Repository } from 'typeorm';

import ISubGoalsOfGoalsRepository from '@modules/sub_goals_of_goals/repositories/ISubGoalsOfGoalsRepository';
import ICreateSubGoalOfGoalDTO from '@modules/sub_goals_of_goals/dtos/ICreateSubGoalOfGoalDTO';

import SubGoalOfGoal from '@modules/sub_goals_of_goals/infra/typeorm/entities/SubGoalOfGoal';

interface ICreateAll {
  goal_id: string;
  sub_goals_ids: string[];
}

class SubGoalsOfGoalsRepository implements ISubGoalsOfGoalsRepository {
  private ormRepository: Repository<SubGoalOfGoal>;

  constructor() {
    this.ormRepository = getRepository(SubGoalOfGoal);
  }

  // public async findAllByIdSubGoals(goalsIds: string[]): Promise<SubGoal[]> {
  //   const subGoals = await this.ormRepository.find({
  //     where: {
  //       goal_ids: In(goalsIds),
  //     },
  //   });

  //   return subGoals;
  // }

  // public async findAll(): Promise<SubGoalOfGoal[] | undefined> {
  //   const subGoals = await this.ormRepository.find();

  //   return subGoals;
  // }

  public async findAllSubGoalById(
    sub_goal_id: string,
  ): Promise<SubGoalOfGoal[] | undefined> {
    const subGoals = await this.ormRepository.find({
      where: {
        sub_goal_id,
      },
    });

    return subGoals;
  }

  public async findAllGoalById(
    goal_id: string,
  ): Promise<SubGoalOfGoal[] | undefined> {
    const subGoalsOfGoal = await this.ormRepository.find({
      where: {
        goal_id,
      },
    });

    return subGoalsOfGoal;
  }

  public async findByName(name: string): Promise<SubGoalOfGoal | undefined> {
    const subGoal = await this.ormRepository.findOne({
      where: { name },
    });

    return subGoal;
  }

  public async createAll({
    goal_id,
    sub_goals_ids,
  }: ICreateAll): Promise<SubGoalOfGoal[]> {
    const subGoalsOfGoalsAll = this.ormRepository.create(
      sub_goals_ids.map(subGoalId => ({
        goal_id,
        sub_goal_id: subGoalId,
      })),
    );

    await this.ormRepository.save(subGoalsOfGoalsAll);

    return subGoalsOfGoalsAll;
  }

  public async create({
    sub_goal_id,
    goal_id,
  }: ICreateSubGoalOfGoalDTO): Promise<SubGoalOfGoal> {
    const subGoalOfGoal = this.ormRepository.create({
      sub_goal_id,
      goal_id,
    });

    await this.ormRepository.save(subGoalOfGoal);

    return subGoalOfGoal;
  }

  public async save(sub_goal_of_goal: SubGoalOfGoal): Promise<SubGoalOfGoal> {
    return this.ormRepository.save(sub_goal_of_goal);
  }
}

export default SubGoalsOfGoalsRepository;
