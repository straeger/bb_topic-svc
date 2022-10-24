import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Topic } from './schemas/topics.schema';
import { MessagePattern } from '@nestjs/microservices';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @MessagePattern({ cmd: 'create' })
  async create(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
    return await this.topicsService.create(createTopicDto);
  }

  @MessagePattern({ cmd: 'get' })
  async findAll(): Promise<Topic[]> {
    return this.topicsService.findAll();
  }

  @MessagePattern({ cmd: 'get-by-id' })
  async findOne(@Param('id') id: string): Promise<Topic> {
    return this.topicsService.findOne(id);
  }

  @MessagePattern({ cmd: 'delete' })
  async delete(@Param('id') id: string): Promise<Topic> {
    return this.topicsService.delete(id);
  }
}
