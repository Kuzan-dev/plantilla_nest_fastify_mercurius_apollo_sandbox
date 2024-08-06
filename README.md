# Plantilla Base para NestJS usando Fastify, GraphQL Mercurius, y ApolloSandbox

## Description

Se configuro esta plantilla con el fin de facilitar la creación de un proyecto en NestJS usando Fastify y GraphQL con Mercurius sin perder la integración con Apollo SandBox para un facil desarrollo con graphQL.

## Configuración de Apollo Sandbox

En el archivo main.ts:

```bash
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app
    .getHttpAdapter()
    .getInstance()
    .get('/playground', (req, reply) => {
      const customGraphiQL = `
      <!DOCTYPE html>
      <html lang="en">
        <body style="margin: 0; overflow-x: hidden; overflow-y: hidden">
        <div id="sandbox" style="height:100vh; width:100vw;"></div>
        <script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script>
        <script>
        new window.EmbeddedSandbox({
          target: "#sandbox",
          initialEndpoint: "http://localhost:4511/graphql",
        });
        </script>
        </body>
      </html>`;
      reply.type('text/html').send(customGraphiQL);
    });
  const port = 4511;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();

```

Configuramos la línea:

```
initialEndpoint: "http://localhost:4511/graphql",
```
En caso usemos otro puerto se debe cambiar esa linea para poder usar Apollo Sandbox

## Installation

```bash

$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```