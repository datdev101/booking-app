import { Request } from 'express';

export interface UserRequest {
  id: string;
  email: string;
}
export interface AuthRequest extends Request {
  user: UserRequest;
}
