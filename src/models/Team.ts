import { Application } from './Application';
import { Game } from './Game';
import { University } from './University';
import { User } from './User';

export interface Team {
  _id: number;
  title: string;
  description?: string;
  members_count: number;
  team_type: string;
  logo_url?: string;
  university_id?: number;
  game_id: number;
  captain_id: number;
  captain?: User;
  game?: Game;
  members?: User[];
  university?: University;
  applications?: Application[];
}
