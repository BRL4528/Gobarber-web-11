// import ICreateSubGoalDTO from '@modules/sub_goals/dtos/ICreateSubGoalDTO';

export default interface ICreateResultOfSubGoalDTO {
  result: boolean;
  sub_goal_id: string;
  goal_id: string;
  sector_id: string;
}
