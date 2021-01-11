// import ICreateSubGoalDTO from '@modules/sub_goals/dtos/ICreateSubGoalDTO';

export default interface ICreateGoalDTO {
  name: string;
  status: string;
  weight: string;
  sectors: string[];
}
