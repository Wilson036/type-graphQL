import { Field, InputType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { IsEmailAlreadyExist } from './IsEmailAlreadyExist';
import { PasswordInput } from '../../../shared/passwordInput';

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 50, { message: 'please enter the first name' })
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'email has already existed' })
  email: string;
}
