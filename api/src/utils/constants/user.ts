import { IUser } from 'src/interfaces/user';
import { Roles } from './db';
import { CookieOptions } from 'express';

export const INITIAL_USER_DATA: IUser = {
  age: '',
  avatar: '',
  email: '',
  firstName: '',
  id: '',
  isLoggedIn: false,
  isProfileUpdated: false,
  isSubscribed: false,
  lastName: '',
  subscriptions: [],
  password: '',
  token: null,
  userName: '',
  role: Roles.USER
};

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 24 * 60 * 60 * 1000
};
