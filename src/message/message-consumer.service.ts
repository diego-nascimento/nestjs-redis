import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';

import { Job } from 'bull';
import {
  messageInterface,
  messageQueueInterface,
} from 'src/appointments/domain/interfaces/messageInterface';
import { Appointment } from 'src/appointments/domain/models/entities/appointment.entity';

import { MessageConsumerInterfaceService } from './interfaces/message-consumer-interface.service';

@Processor(messageQueueInterface.sendMail)
export class MessageConsumerService implements MessageConsumerInterfaceService {
  constructor(private readonly mailerService: MailerService) {}

  @Process(messageInterface.appoitmentCreate)
  async appointmentCreateConsumer(job: Job<Appointment>) {
    const appointment = job.data;
    await this.mailerService.sendMail({
      to: 'test@nestjs.com', // list of receivers
      from: 'noreply@nestjs.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>',
    });
  }
}
