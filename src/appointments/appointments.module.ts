import { Module } from '@nestjs/common';
import { AppointmentsService } from './application/appointments.service';
import { AppointmentsController } from './presentation/appointments.controller';

import { BullModule, InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MiddlewareBuilder } from '@nestjs/core';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';

import { AppointmentRepository } from './infra/repository/appointment-repository.service';
import { AppointmentMessageService } from './infra/message/appointment-message.service';
import { messageQueueInterface } from './domain/interfaces/messageInterface';
import { AppointmentServiceInterface } from './domain/interfaces/appointment.service-interface';
import { AppointmentRepositoryServiceInterface } from './domain/interfaces/appointment-repository.service-interface';
import { PrismaService } from 'src/infra/prisma.service';
import { AppointmentMessageServiceInterface } from './domain/interfaces/appointment-message.service-interface';

@Module({
  imports: [
    BullModule.registerQueue({
      name: messageQueueInterface.sendMail,
    }),
  ],
  controllers: [AppointmentsController],
  providers: [
    {
      provide: AppointmentServiceInterface,
      useClass: AppointmentsService,
    },
    {
      provide: AppointmentRepositoryServiceInterface,
      useClass: AppointmentRepository,
    },
    {
      provide: PrismaService,
      useClass: PrismaService,
    },
    {
      provide: AppointmentMessageServiceInterface,
      useClass: AppointmentMessageService,
    },
  ],
})
export class AppointmentsModule {
  constructor(
    @InjectQueue(messageQueueInterface.sendMail) private readonly queue: Queue,
  ) {}

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([new BullAdapter(this.queue)]);
    consumer.apply(router).forRoutes('/admin/queues');
  }
}
