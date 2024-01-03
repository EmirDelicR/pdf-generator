import { IUser } from 'src/interfaces/user';
import { Roles } from './db';

const INITIAL_USER_DATA: IUser = {
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

export { INITIAL_USER_DATA };
