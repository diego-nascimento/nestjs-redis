import { randomUUID } from 'node:crypto';

export class Appointment {
  _id: string;
  _startsAt: Date;
  _endsAt: Date;

  constructor(startsAt: Date, endsAt: Date, id?: string) {
    this._id = id ?? randomUUID();
    this._startsAt = new Date(startsAt);
    this._endsAt = new Date(endsAt);
  }
}
