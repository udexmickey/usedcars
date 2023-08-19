import { PartialType } from '@nestjs/swagger';
import { createUserDto } from './create-user.dto';

export class UpdateUserDTO extends PartialType(createUserDto) {}
