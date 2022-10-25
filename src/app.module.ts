import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/bb-topics', {
      connectionFactory: (connection) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TopicsModule,
  ],
})
export class AppModule {}
