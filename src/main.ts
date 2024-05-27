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
