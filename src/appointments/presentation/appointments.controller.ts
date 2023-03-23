import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AppointmentPresentationInterface } from '../domain/interfaces/appointment-presentation-interface';
import { AppointmentServiceInterface } from '../domain/interfaces/appointment.service-interface';
import { CreateAppointmentDto } from '../domain/models/dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController
  implements AppointmentPresentationInterface
{
  constructor(
    @Inject(AppointmentServiceInterface)
    private readonly appointmentsService: AppointmentServiceInterface,
  ) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }
}
