export default () => ({
  port: parseInt(process.env.NESTJS_PORT, 10) || 3000,
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    logging: process.env.NODE_ENV !== 'production',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    timeout: process.env.JWT_TIMEOUT || 3600,
  },
  bcrypt: {
    round: parseInt(process.env.BCRYPT_ROUND, 10) || 10,
  },
});
