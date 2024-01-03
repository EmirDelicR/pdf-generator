import { Roles } from 'src/database/utils/constants';
import { IUser } from 'src/interfaces/user';

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
