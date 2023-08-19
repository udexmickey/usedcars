import { Exclude, Expose } from 'class-transformer';

//The UserDto is basically the respond a user/client gets
//back when making a request to the users resource/table
//That's why password is excluded
//the @Expose decorator are the properties you get back on successful request
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Exclude()
  password: string;
}
