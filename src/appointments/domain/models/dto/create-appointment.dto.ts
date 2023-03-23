import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsDateString()
  startsAt: Date;

  @IsNotEmpty()
  @IsDateString()
  endsAt: Date;
}
