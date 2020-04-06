import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());

  // Inicialização do Swagger
  const options = new DocumentBuilder()
    .setTitle('Sports Store')
    .setDescription('A melhor loja esportiva online')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
