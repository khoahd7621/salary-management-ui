import { User } from '../User';

export interface Response extends User {
  token: string;
}
