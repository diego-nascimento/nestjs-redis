import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { AppointmentRepositoryServiceInterface } from 'src/appointments/domain/interfaces/appointment-repository.service-interface';
import { Appointment } from 'src/appointments/domain/models/entities/appointment.entity';
import { PrismaService } from 'src/infra/prisma.service';

export class AppointmentRepository
  implements AppointmentRepositoryServiceInterface
{
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}
  async createAppointmentRepository(appointment: Appointment): Promise<void> {
    try {
      await this.prisma.appointments.create({
        data: {
          id: appointment._id,
          startAt: appointment._startsAt,
          endsAt: appointment._endsAt,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
