import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    //context is the actual wrapper around the incoming request
    //while handler/next as you may name it is refer to as the reference to
    //the actual handle that's going to run at some point in time
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}
