import { forgotPasswordPrefix } from '../../contants/redisPrefixes';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { redis } from '../../redis';
import bcrpt from 'bcryptjs';
import { ChangePasswordInput } from './change\bPassword/change\bPasswordInput';
import { Context } from 'src/types/Context';

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg('data') { token, password }: ChangePasswordInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    await redis.del(forgotPasswordPrefix + token);
    user.password = await bcrpt.hash(password, 12);
    user.save();
    //@ts-ignore
    ctx.req.session!.userId = user.id;
    return user;
  }
}
