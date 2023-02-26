import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import { ValidationPipe } from './pipes/validation.pipe';
async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Server for quest-app')
    .setDescription('Rest API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  //app.useGlobalPipes(new ValidationPipe());
  //app.enableCors();
  await app.listen(PORT, () => console.log(`Server in port: ${PORT}`));
}
start();
