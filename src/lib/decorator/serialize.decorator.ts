import { UseInterceptors } from '@nestjs/common';
import { SerializerInterceptor } from '../interceptors/serialize.interceptors';

interface ClassConstructor {
  new (...args: any[]): object;
}
export function Serialize(dto: ClassConstructor) {
  //the interceptors is used to get request before execution and
  //responds after excution of request
  return UseInterceptors(new SerializerInterceptor(dto));
}
