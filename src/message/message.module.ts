import { Module } from '@nestjs/common';

import { BullModule } from '@nestjs/bull';

import { MessageConsumerService } from './message-consumer.service';
import { messageQueueInterface } from 'src/appointments/domain/interfaces/messageInterface';

@Module({
  imports: [
    BullModule.registerQueue({
      name: messageQueueInterface.sendMail,
    }),
  ],
  controllers: [],
  providers: [MessageConsumerService],
})
export class MessageModule {}
