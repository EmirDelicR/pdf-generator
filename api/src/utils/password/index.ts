import { hash, verify } from 'argon2';

export const hashPassword = async (password: string) => {
  const { AUTH_PASSWORD_SALT } = process.env;
  const salt = Buffer.from(`${AUTH_PASSWORD_SALT}`, 'utf-8');
  return await hash(password, { salt });
};

export const verifyPassword = async (
  userPassword: string,
  passwordToCheck: string
) => {
  const { AUTH_PASSWORD_SALT } = process.env;
  const salt = Buffer.from(`${AUTH_PASSWORD_SALT}`, 'utf-8');
  return await verify(userPassword, passwordToCheck, { salt });
};
