import { Roles } from 'src/utils/constants/db';

export interface IUpdateUserBodyRequest {
  age: number | null;
  avatar: string;
  firstName: string;
  lastName: string;
  subscribed: boolean;
  subscriptions: string[];
}

export interface IUser extends IUpdateUserBodyRequest {
  email: string;
  id: string;
  loggedIn: boolean;
  profileUpdated: boolean;
  password: string;
  token: string | null;
  userName: string;
  role: Roles;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthUserBodyRequest {
  email: string;
  password: string;
}

export interface IJwtTokenData extends IAuthUserBodyRequest {
  iat: number;
  exp: number;
}
