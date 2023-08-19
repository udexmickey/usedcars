import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  createUser(email: string, password: string) {
    const newUser = this.repo.create({ email, password });
    return this.repo.save(newUser);
  }

  findOne(id: number) {
    if (!id) throw new NotAcceptableException();
    const user = this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException(`user with id "${id}" not found`);
    if (user) return user;
  }

  findEmail(email: string) {
    const UserEmail = this.repo.findOneBy({ email });
    return UserEmail;
  }

  findAll() {
    const user = this.repo.find();
    return user;
  }

  async updateOne(id: number, updatedUser: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`user with id "${id}" not found`);
    //Object.Assign takes the id of an entity and add updated part/object to
    //the existing property in the db and return the old data if propert was not updated
    //more like findOne and update
    Object.assign(user, updatedUser);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }
}
