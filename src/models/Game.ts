import { Team } from './Team';

export interface Game {
  _id: number;
  title: string;
  short_title: string;
  description?: string;
  genre: string;
  store_url?: string;
  main_image_url?: string;
  background_image_url?: string;
  teams?: Team[];
  events?: Event[];
}
