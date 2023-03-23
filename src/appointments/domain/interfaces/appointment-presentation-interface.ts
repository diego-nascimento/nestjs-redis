import { CreateAppointmentDto } from '../models/dto/create-appointment.dto';

export abstract class AppointmentPresentationInterface {
  abstract create(createAppointmentDto: CreateAppointmentDto);
}
