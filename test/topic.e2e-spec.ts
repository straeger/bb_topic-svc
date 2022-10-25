import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ClientsModule, Transport, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { TopicsModule } from '../src/topics/topics.module';
import { AppModule } from '../src/app.module';

describe('Topic e2e test', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TopicsModule,
        AppModule,
        ClientsModule.register([
          { name: 'TopicService', transport: Transport.TCP },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.connectMicroservice({
      transport: Transport.TCP,
    });

    await app.startAllMicroservices();
    await app.init();

    client = app.get('TopicService');
    await client.connect();
  });

  afterAll(async () => {
    await app.close();
    client.close();
  });

  it('test create topic', (done) => {
    const topic = {
      name: 'testTopic',
      description: 'Lorem Ipsum dollar sit amed',
    };

    const response: Observable<any> = client.send({ cmd: 'create' }, topic);

    response.subscribe({
      next: (created) => {
        expect(created.description).toBe(topic.description);
        expect(created.name).toBe(topic.name);

        client.send({ cmd: 'delete' }, created._id);
        done();
      },
      error: done,
    });
  });
});
