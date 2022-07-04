import { News } from './News';
import { User } from './User';

export interface File {
  _id: number;
  fileName: string;
  fullPath: string;
  user_id: number;
  event_id?: number;
  news_id?: number;
  created_at: string;
  updated_at: string;
  // Sequelize Relations
  user?: User;
  event?: Event;
  news?: News;
}
