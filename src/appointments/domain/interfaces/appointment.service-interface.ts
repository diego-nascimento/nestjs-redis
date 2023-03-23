import { CreateAppointmentDto } from '../models/dto/create-appointment.dto';
import { Appointment } from '../models/entities/appointment.entity';

export abstract class AppointmentServiceInterface {
  abstract create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment>;
}
