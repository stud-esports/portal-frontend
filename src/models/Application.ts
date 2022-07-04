import { Team } from './Team';
import { University } from './University';
import { User } from './User';

export interface Application {
  _id: number;
  reason: string;
  is_archived: boolean;
  status: string;
  commentary?: string;
  university_id?: number;
  created_at: string;
  updated_at: string;
  applicant_id: number;
  team_id?: number;
  user?: User;
  university?: University;
  team?: Team;
}
