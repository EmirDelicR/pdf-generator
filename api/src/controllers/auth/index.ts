import crypto from 'crypto';
import { CookieOptions, NextFunction, Request, Response } from 'express';

import { IApiResponse, IApiResponseWithToken } from 'src/interfaces/api';
import { IAuthUserBodyRequest, IUser } from 'src/interfaces/user';
import { Roles } from 'src/utils/constants/db';

import HttpError from 'src/utils/errors/httpError';
import { writeErrorToFile } from 'src/utils/file';
import { hashPassword, verifyPassword } from 'src/utils/password';
import { signToken, verifyToken } from 'src/utils/token';
import {
  validateEmail,
  validatePassword,
  validateProperty
} from 'src/utils/validation';

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 24 * 60 * 60 * 1000
};

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

const loginUser = async (
  email: string,
  password: string
): Promise<IApiResponseWithToken> => {
  validateEmail(email);
  validateProperty(password, 'Password');

  const user = getUserByEmailFromDb(email);

  if (!user) {
    throw new HttpError({ message: 'No user found in DB!', status: 404 });
  }

  const isPasswordMatch = await verifyPassword(user.password, password);
  if (!isPasswordMatch) {
    throw new HttpError({ message: 'Invalid password!', status: 400 });
  }

  const refreshToken = signToken(password, email, true);

  user.token = signToken(password, email);
  user.isLoggedIn = true;
  patchUserInDb(user);
  const { password: pass, ...rest } = user;

  return {
    data: { ...rest },
    message: 'User is sign in successfully',
    status: 200,
    refreshToken
  };
};

const signIn = async (
  req: Request<unknown, unknown, IAuthUserBodyRequest>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { refreshToken, ...response } = await loginUser(email, password);

    res.cookie('jwt', refreshToken, COOKIE_OPTIONS);
    res.status(200).json(response);
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

const autoSignIn = async (
  req: Request<unknown, unknown, { token: string }>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    const { email, password, exp } = verifyToken(token);

    if (Date.now() >= exp * 1000) {
      throw new HttpError({
        message: 'Token expired, please login again',
        status: 403
      });
    }

    const { refreshToken, ...response } = await loginUser(email, password);

    res.cookie('jwt', refreshToken, COOKIE_OPTIONS);
    res.status(200).json(response);
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

const signUp = async (
  req: Request<unknown, unknown, IAuthUserBodyRequest>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    validateEmail(email);
    validatePassword(password);

    const user = getUserByEmailFromDb(email);

    if (user) {
      throw new HttpError({
        message: 'User already exist. Please login!',
        status: 409
      });
    }
    // Encrypt user password
    const hashedPassword = await hashPassword(password);

    const newUser: IUser = {
      ...INITIAL_USER_DATA,
      isLoggedIn: true,
      email,
      password: hashedPassword,
      id: crypto.randomUUID()
    };
    // save user token
    newUser.token = signToken(password, email);
    writeToDbFile([...getAllUsersFromDb(), newUser], 'user.json');
    const { password: pass, ...rest } = newUser;
    const refreshToken = signToken(password, email, true);

    res.cookie('jwt', refreshToken, COOKIE_OPTIONS);
    res.status(201).json({
      data: { ...rest },
      message: 'User is sign up successfully',
      status: 201
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

const updateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cookies } = req;

    if (!cookies?.jwt) {
      throw new HttpError({
        message: 'Token is not set in cookies',
        status: 403
      });
    }

    const { email, password, exp } = verifyToken(cookies.jwt, true);
    const user = getUserByEmailFromDb(email);

    if (!user) {
      throw new HttpError({ message: 'No user found in DB!', status: 404 });
    }

    if (user.email !== email) {
      throw new HttpError({
        message: 'Authorization forbidden',
        status: 403
      });
    }

    if (Date.now() >= exp * 1000) {
      throw new HttpError({
        message: 'Token expired, please login again',
        status: 403
      });
    }

    user.token = signToken(password, email);
    user.isLoggedIn = true;
    patchUserInDb(user);
    const { password: pass, ...rest } = user;

    const refreshToken = signToken(password, email, true);

    res.cookie('jwt', refreshToken, COOKIE_OPTIONS);
    res.status(201).json({
      data: { ...rest },
      message: 'User token is updated successfully',
      status: 201
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

export const authController = {
  signIn,
  signUp,
  updateToken,
  autoSignIn
};
