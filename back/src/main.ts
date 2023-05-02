import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';



import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('exercice nest Js')
    .setDescription('exercice API description')
    .setVersion('1.0')
    .addTag('nest and react')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();

