import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SWAGGER CONFIG
  const config = new DocumentBuilder()
    .setTitle('Courier Backend API')
    .setDescription('API documentation for Courier Service')
    .setVersion('1.0')
    .addBearerAuth() // enables JWT auth button
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // will be at /docs

  await app.listen(3000);
  console.log('Swagger running at: http://localhost:3000/docs');
}
bootstrap();
