import { File } from './File';
import { University } from './University';
import { User } from './User';

export interface News {
  _id: number;
  title: string;
  description: string;
  text: string;
  main_image_url?: string;
  university_id?: number;
  user_id: number;
  event_id?: number;
  created_at: string;
  updated_At: string;
  university?: University;
  event?: Event;
  user?: User;
  files?: File[];
}
