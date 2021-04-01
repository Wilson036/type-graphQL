import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import bcrpt from 'bcryptjs';
import { User } from '../../entity/User';
import { RegisterInput } from './register/Registerinput';
import { isAuth } from '../middleware/isAuth';
import { sendEMail } from '../../utils/sendEMail';
import { createConfirmationUrl } from '../../utils/createConfirmationUrl';

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
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

    sendEMail(email, await createConfirmationUrl(user.id));

    return user;
  }
}
