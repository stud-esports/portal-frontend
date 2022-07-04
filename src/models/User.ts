import { Team } from './Team';
import { University } from './University';

export interface Role {
  name: string;
}

export interface User {
  _id: number;
  email: string;
  name: string;
  surname: string;
  roles: Role[];
  login: string;
  phone: string;
  level: number;
  points: number;
  password?: string;
  status: string;
  is_online: boolean;
  last_online: Date;
  first_name: string;
  last_name: string;
  patronymic?: string;
  gender: 'male' | 'female';
  birth_date: string;
  about_yourself: string;
  student_card: string;
  photo_url?: string;
  block_reason?: string;
  banned_from_date: string;
  banned_to_date?: string;
  created_at: string;
  updated_at: string;
  university_id?: number;
  moderated_university_id?: number;
  teams?: Team[];
  moderated_university?: University;
  university?: University;
}
