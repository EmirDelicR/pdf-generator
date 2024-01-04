import { IUser } from 'src/interfaces/user';
import { Roles } from './db';
import { CookieOptions } from 'express';

export const INITIAL_USER_DATA: IUser = {
  age: null,
  avatar: '',
  email: '',
  firstName: '',
  id: '',
  lastName: '',
  loggedIn: false,
  password: '',
  profileUpdated: false,
  role: Roles.USER,
  subscribed: false,
  subscriptions: [],
  token: null,
  userName: '',
  createdAt: new Date(),
  updatedAt: new Date()
};

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 24 * 60 * 60 * 1000
};
