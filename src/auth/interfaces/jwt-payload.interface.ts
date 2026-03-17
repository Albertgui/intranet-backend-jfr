import { Request } from 'express';

export interface ActiveUser {
  id: string;
  email: string;
  role: 'ADMIN' | 'VOCERO' | 'HABITANTE';
}

export interface RequestWithUser extends Request {
  user: ActiveUser;
}
