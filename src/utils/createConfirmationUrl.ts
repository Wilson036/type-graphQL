import { confirmationPrefix } from '../contants/redisPrefixes';
import { v4 } from 'uuid';
import { redis } from '../redis';

export const createConfirmationUrl = async (userId: number) => {
  const token = v4();
  await redis.set(confirmationPrefix + token, userId, 'ex', 60 * 60 * 24);
  return `http://localhost:3000/confirm/${token}`;
};
