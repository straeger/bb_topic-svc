import { Test, TestingModule } from '@nestjs/testing';
import { TopicsService } from './topics.service';
import { getModelToken } from '@nestjs/mongoose';
import { Topic } from './schemas/topics.schema';
import { Model } from 'mongoose';

const mockTopic = {
  name: 'Topic #1',
  description: 'Breed #1',
};

describe('TopicsService', () => {
  let service: TopicsService;
  let model: Model<Topic>;

  const topicsArray = [
    {
      name: 'Topic #1',
      description: 'Breed #1',
    },
    {
      name: 'Topic #2',
      description: 'Breed #2',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicsService,
        {
          provide: getModelToken('Topic'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockTopic),
            constructor: jest.fn().mockResolvedValue(mockTopic),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TopicsService>(TopicsService);
    model = module.get<Model<Topic>>(getModelToken('Topic'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all topics', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(topicsArray),
    } as any);
    const topics = await service.findAll();
    expect(topics).toEqual(topicsArray);
  });

  it('should insert a new topic', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Topic #1',
        description: 'Breed #1',
      }),
    );
    const newTopic = await service.create({
      name: 'Topic #1',
      description: 'Breed #1',
    });
    expect(newTopic).toEqual(mockTopic);
  });
});
