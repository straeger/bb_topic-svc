import { Test, TestingModule } from '@nestjs/testing';
import { TopicsController } from './topics.controller';
import { CreateTopicDto } from './dto/create-topic.dto';
import { TopicsService } from './topics.service';

describe('Topics Controller', () => {
  let controller: TopicsController;
  let service: TopicsService;
  const createTopicDto: CreateTopicDto = {
    name: 'Topic #1',
    description: 'Breed #1',
  };

  const mockTopic = {
    name: 'Topic #1',
    description: 'Breed #1',
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicsController],
      providers: [
        {
          provide: TopicsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'Topic #1',
                description: 'Breed #1',
              },
              {
                name: 'Topic #2',
                description: 'Breed #1',
              },
              {
                name: 'Topic #3',
                description: 'Breed #1',
              },
            ]),
            create: jest.fn().mockResolvedValue(createTopicDto),
          },
        },
      ],
    }).compile();

    controller = module.get<TopicsController>(TopicsController);
    service = module.get<TopicsService>(TopicsService);
  });

  describe('create()', () => {
    it('should create a new topic', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockTopic);

      await controller.create(createTopicDto);
      expect(createSpy).toHaveBeenCalledWith(createTopicDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of topics', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          name: 'Topic #1',
          description: 'Breed #1',
        },
        {
          name: 'Topic #2',
          description: 'Breed #1',
        },
        {
          name: 'Topic #3',
          description: 'Breed #1',
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
