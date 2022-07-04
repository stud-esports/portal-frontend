import { University } from './University';
import { User } from './User';

export interface Contact {
  _id: number;
  position: string;
  questions: string;
  university_id?: number;
  user_id: number;
  user?: User;
  university?: University;
}
