import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { AppointmentsModule } from './appointments/appointments.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    AppointmentsModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'gregoria.huel64@ethereal.email',
          pass: 'j27Fezcm4mjA569yTM',
        },
      },
    }),
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
