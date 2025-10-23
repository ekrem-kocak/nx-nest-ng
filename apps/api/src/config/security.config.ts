import { registerAs } from '@nestjs/config';

export default registerAs('security', () => ({
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 10,
  rateLimitTtl: parseInt(process.env.RATE_LIMIT_TTL, 10) || 60,
  rateLimitLimit: parseInt(process.env.RATE_LIMIT_LIMIT, 10) || 100,
}));
