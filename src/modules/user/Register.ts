import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrpt from 'bcryptjs';
import { User } from '../../entity/User';
import { RegisterInput } from './register/Registerinput';

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'hello world';
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { firstName, lastName, email, password }: RegisterInput
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
