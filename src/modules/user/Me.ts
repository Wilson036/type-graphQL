import { Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { Context } from 'src/types/Context';

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | undefined> {
    //@ts-ignore
    const id = ctx.req.session.userId;
    if (!id) {
      return undefined;
    }

    return User.findOne(id);
  }
}
