import type { authSchema } from '../validations';
import { z } from 'zod';
export type LoginData = z.infer<typeof authSchema>;

export interface User {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
