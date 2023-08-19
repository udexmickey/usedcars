import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log({ message: `succefully inserted user with id ${this.id}` });
  }

  @AfterUpdate()
  updateUser() {
    console.log('updated user with the id', this.id);
  }

  @AfterRemove()
  removeUser() {
    console.log(`user with id ${this.id} was successfully deleted`);
  }
}
