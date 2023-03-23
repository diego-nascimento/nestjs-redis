import { Inject, Injectable } from '@nestjs/common';
import { AppointmentMessageServiceInterface } from '../domain/interfaces/appointment-message.service-interface';
import { AppointmentRepositoryServiceInterface } from '../domain/interfaces/appointment-repository.service-interface';
import { AppointmentServiceInterface } from '../domain/interfaces/appointment.service-interface';
import { CreateAppointmentDto } from '../domain/models/dto/create-appointment.dto';
import { Appointment } from '../domain/models/entities/appointment.entity';

@Injectable()
export class AppointmentsService implements AppointmentServiceInterface {
  constructor(
    @Inject(AppointmentRepositoryServiceInterface)
    private readonly appointmentRepositoryService: AppointmentRepositoryServiceInterface,
    @Inject(AppointmentMessageServiceInterface)
    private appointmentMessageService: AppointmentMessageServiceInterface,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = new Appointment(
      createAppointmentDto.startsAt,
      createAppointmentDto.endsAt,
    );
    await this.appointmentRepositoryService.createAppointmentRepository(
      appointment,
    );
    await this.appointmentMessageService.appointmentCreated(appointment);
    return appointment;
  }
}
