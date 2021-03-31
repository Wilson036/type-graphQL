import { Context } from 'src/types/Context';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  //@ts-ignore
  if (!context.req.session.userId) {
    throw new Error('you should login first');
  }

  return next();
};
