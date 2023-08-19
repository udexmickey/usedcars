import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asdjxcmvdkdabjzxcmnvgj'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      //the whitelist helps to remove any property that does not belong to the expected dto / payload
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
