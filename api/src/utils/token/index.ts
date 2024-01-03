import jwt from 'jsonwebtoken';
import { IJwtTokenData } from 'src/interfaces/user';

const signToken = (password: string, email: string, isRefreshToken = false) => {
  const {
    AUTH_JWT_SECRET,
    AUTH_JWT_EXPIRES,
    AUTH_JWT_REFRESH_SECRET,
    AUTH_JWT_REFRESH_EXPIRES
  } = process.env;

  return jwt.sign(
    { email, password },
    `${isRefreshToken ? AUTH_JWT_REFRESH_SECRET : AUTH_JWT_SECRET}`,
    {
      expiresIn: isRefreshToken ? AUTH_JWT_REFRESH_EXPIRES : AUTH_JWT_EXPIRES
    }
  );
};

const verifyToken = (token: string, isRefreshToken = false) => {
  const { AUTH_JWT_SECRET, AUTH_JWT_REFRESH_SECRET } = process.env;
  return jwt.verify(
    token,
    `${isRefreshToken ? AUTH_JWT_REFRESH_SECRET : AUTH_JWT_SECRET}`
  ) as IJwtTokenData;
};

export { signToken, verifyToken };
