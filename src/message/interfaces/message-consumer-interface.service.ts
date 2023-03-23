import { Job } from 'bull';
import { Appointment } from 'src/appointments/models/entities/appointment.entity';

export abstract class MessageConsumerInterfaceService {
  abstract appointmentCreateConsumer(job: Job<Appointment>): Promise<void>;
}
