import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Topic, TopicDocument } from './schemas/topics.schema';

@Injectable()
export class TopicsService {
  constructor(
    @InjectModel(Topic.name) private readonly topicModel: Model<TopicDocument>,
  ) {}

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    return await this.topicModel.create(createTopicDto);
  }

  async findAll(): Promise<Topic[]> {
    return this.topicModel.find().exec();
  }

  async findOne(id: string): Promise<Topic> {
    return this.topicModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedTopic = await this.topicModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedTopic;
  }
}
