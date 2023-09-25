import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

it('Can create instance of auth service', async () => {
  const module = Test.createTestingModule({
    providers: [AuthService],
  }).compile();

  const service = (await module).get(AuthService);

  expect(service).toBeDefined();
});
