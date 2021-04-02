import { Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from 'src/types/Context';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: Context): Promise<boolean> {
    return new Promise((resolve, reject) =>
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        res.clearCookie('qid');
        return resolve(true);
      })
    );
  }
}
