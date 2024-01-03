import { hash } from 'argon2';

const hashPassword = async (password: string) => {
  const { AUTH_PASSWORD_SALT } = process.env;
  const salt = Buffer.from(`${AUTH_PASSWORD_SALT}`, 'utf-8');
  return await hash(password, { salt });
};

export { hashPassword };
