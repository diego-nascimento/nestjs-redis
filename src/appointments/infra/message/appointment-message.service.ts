import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { AppointmentMessageServiceInterface } from 'src/appointments/domain/interfaces/appointment-message.service-interface';
import { messageInterface } from 'src/appointments/domain/interfaces/messageInterface';
import { Appointment } from 'src/appointments/domain/models/entities/appointment.entity';

export class AppointmentMessageService
  implements AppointmentMessageServiceInterface
{
  constructor(@InjectQueue('sendMail') private readonly queue: Queue) {}

  async appointmentCreated(appointment: Appointment): Promise<void> {
    await this.queue.add(messageInterface.appoitmentCreate, appointment);
  }
}
