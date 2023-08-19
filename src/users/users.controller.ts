import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/lib/decorator/serialize.decorator';

@Controller('users')
//Using The Serialized Decorator for all user routes
//So basically The SerializerInterceptor serves as interceptor between user
//request the the respond the get back from the Dto the most have provided
@Serialize(UserDto)
export class UsersController {
  constructor(private userServices: UsersService) {}

  //Using The Serialized Decorator below 👇👇👇 for just one route
  // @Serialize(UserDto)
  //The Serialized Decorator serves as an interceptors which is used to
  //get request before execution and responds after execution of request
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userServices.findOne(+id);
  }

  @Get()
  findUsers() {
    return this.userServices.findAll();
  }

  @Patch('/:id/update')
  updateUser(@Param('id') id: string, @Body() updatedUser: UpdateUserDTO) {
    return this.userServices.updateOne(+id, updatedUser);
  }

  @Delete('/:id/delete')
  deleteUser(@Param('id') id: string) {
    return this.userServices.remove(+id);
  }
}
