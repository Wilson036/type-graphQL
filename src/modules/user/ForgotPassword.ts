import { forgotPasswordPrefix } from '../../contants/redisPrefixes';
import { sendEMail } from '../../utils/sendEMail';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { v4 } from 'uuid';
import { User } from '../../entity/User';
import { redis } from '../../redis';

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPasswordR(@Arg('email') email: string): Promise<Boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }
    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24);
    sendEMail(email, `https://localhost:3000/change-password/${token}`);
    return true;
  }
}
