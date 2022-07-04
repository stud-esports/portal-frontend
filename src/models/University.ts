import { Contact } from './Contact';
import { News } from './News';
import { Team } from './Team';
import { User } from './User';

export interface University {
  _id: number;
  title: string;
  short_name: string;
  logo_url?: string;
  address: string;
  email?: string;
  phone?: string;
  link?: string;
  moderators?: User[];
  contacts?: Contact[];
  users?: User[];
  news?: News[];
  teams?: Team[];
}
