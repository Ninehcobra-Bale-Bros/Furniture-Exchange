import * as dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

// port
const PORT = process.env.PORT || 3000;

// environment variables
const NODE_ENV = process.env.NODE_ENV || 'development';

// client url
const CLIENT_URL = process.env.CLIENT_URL || '/';

// jsonwebtoken
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_AT_EXPIRES_IN = process.env.JWT_AT_EXPIRES_IN || '15m';
const JWT_RT_EXPIRES_IN = process.env.JWT_RT_EXPIRES_IN || '1d';

// bcrypt
const SALT_OR_ROUNDS = +process.env.SALT_OR_ROUNDS || 10;

// postgres database
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;

// redis
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_TTL = +process.env.REDIS_TTL || 60 * 60 * 1000; // miliseconds

// rate limiting
const THROTTLE_TTL = +process.env.RATE_LIMIT_TTL || 60;
const THROTTLE_LIMIT = +process.env.RATE_LIMIT_LIMIT || 10;

// cloudinary
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || 'nestjs-cloudinary';

// vnpay
const VNPAY_TMN_CODE = process.env.VNPAY_TMN_CODE;
const VNPAY_HASH_SECRET = process.env.VNPAY_HASH_SECRET;
const VNPAY_URL = process.env.VNPAY_URL;

export {
  PORT,
  NODE_ENV,
  CLIENT_URL,
  JWT_SECRET,
  JWT_AT_EXPIRES_IN,
  JWT_RT_EXPIRES_IN,
  SALT_OR_ROUNDS,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_TTL,
  THROTTLE_TTL,
  THROTTLE_LIMIT,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_FOLDER,
  VNPAY_TMN_CODE,
  VNPAY_HASH_SECRET,
  VNPAY_URL,
};
