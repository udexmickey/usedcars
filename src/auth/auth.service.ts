import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { scrypt as _script, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    try {
      //check if email exist
      const UserEmail = await this.userService.findEmail(email);
      if (UserEmail) throw new BadRequestException('Email already exist');

      //Hash and salt password
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      const hashedPassword = salt + '.' + hash.toString('hex');

      //Create new user with email and the hashed password
      const registerUser = await this.userService.createUser(
        email,
        hashedPassword,
      );
      //Return new created user
      return registerUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async signIn(email: string, password: string) {
    //check if email exist
    const user = await this.userService.findEmail(email);
    if (!user) throw new UnauthorizedException('invalid credentials');

    //check if password is correct to the encripted password
    const [salt, storedHash] = await user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash)
      throw new BadRequestException('invalid credentials');
    //return visiting user
    return user;
  }
}
