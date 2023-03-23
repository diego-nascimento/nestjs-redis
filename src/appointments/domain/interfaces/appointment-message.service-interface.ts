import { Appointment } from '../models/entities/appointment.entity';

export abstract class AppointmentMessageServiceInterface {
  abstract appointmentCreated(appointment: Appointment): Promise<void>;
}
