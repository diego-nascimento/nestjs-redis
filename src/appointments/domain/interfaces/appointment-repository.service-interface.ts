import { Appointment } from '../models/entities/appointment.entity';

export abstract class AppointmentRepositoryServiceInterface {
  abstract createAppointmentRepository(appointment: Appointment): Promise<void>;
}
