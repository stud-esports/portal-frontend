import { User } from '../../models/User';

export interface RefreshTokensResponse {
  access_token: string;
  refresh_token: string;
}

export interface SigninResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface SignupResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
}

export interface UserCreationData {
  email: string;
  login: string;
  phone: string;
  birth_date: Date;
  about_yourself?: string;
  first_name: string;
  last_name: string;
  patronymic?: string;
  password: string;
  gender: string;
  student_card?: string;
  university_id?: number;
}
