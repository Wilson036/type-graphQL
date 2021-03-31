import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import bcrpt from 'bcryptjs';
import { User } from '../../entity/User';
import { Context } from 'src/types/Context';

@Resolver()
export class LoginResolver {
  @Mutation(() => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    console.log(email);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const vaild = await bcrpt.compare(password, user.password);

    if (!vaild) {
      return null;
    }

    //@ts-ignore
    ctx.req.session!.userId = user.id;

    return user;
  }
}
