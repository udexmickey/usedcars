import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

//The SerializerInterceptor is used to hide password when
//sending back respond after it nmust have been proccessed...
export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //run something before request is handled
    //by the request handler
    // console.log('i am running before context', context);

    return handler.handle().pipe(
      map((data: any) => {
        //Run something before respond is sent out
        // console.log('i am running before context', data);
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
