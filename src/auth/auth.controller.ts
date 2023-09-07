import {
  Controller,
  Post,
  Body,
  Session,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { CurrentUser } from 'src/lib/decorator/current-user.decorator';
import { UserDto } from 'src/users/dtos/user.dto';
import { Serialize } from 'src/lib/decorator/serialize.decorator';
import { User } from 'src/users/users.entity';
import { AuthDGuard } from 'src/lib/guards/auth.guard';

@Controller('auth')
//Using The Serialized Decorator for all user routes
//So basically The SerializerInterceptor serves as interceptor between user
//request the the respond the get back from the Dto the most have provided
@Serialize(UserDto)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateAuthDto, @Session() session: any) {
    const newUser = await this.authService.signUp(body.email, body.password);
    session.userId = newUser.id;
    return newUser;
  }

  @Post('/signin')
  async signInUser(@Body() body: CreateAuthDto, @Session() session: any) {
    const existingUser = await this.authService.signIn(
      body.email,
      body.password,
    );

    //this is to store the logged in user to the cookie session header
    session.userId = existingUser.id;

    //this line of code only finds the user whose logged in from cookie session
    //after successful login it stores the userId to cookie header
    //the line below 👇👇👇 uses the id stored to get the logged in user
    const user = await this.userService.findOne(session.userId);
    return user;
  }

  @Post('signout')
  signout(@Session() session: any) {
    //signout works by equating the stored session userId to null 👇👇👇
    session.userId = null;
    return JSON.stringify({ message: 'logout successful' });
  }

  @Get('/currentuser')
  @UseGuards(AuthDGuard)
  currentUser(@CurrentUser() user: User) {
    return user;
  }
}
