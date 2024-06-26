import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('Room API')
    .setDescription('My Room API')
    .build());

  SwaggerModule.setup('docs', app, document);
  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
