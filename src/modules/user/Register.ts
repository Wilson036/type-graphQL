import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import * as bcrpt from 'bcryptjs';
import { User } from '../../entity/User';

@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'hello world';
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashPwd = await bcrpt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPwd,
    }).save();

    return user;
  }
}
