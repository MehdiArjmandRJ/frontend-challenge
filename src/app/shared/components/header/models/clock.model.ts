import { interval } from 'rxjs';

export class Clock {
  private readonly _date: Date;
  public clockStr: string;

  public get date(): Date {
    return this._date;
  }

  constructor(date: Date) {
    this._date = date;

    this.updateClockStr();
    this.interval();
  }

  private updateClockStr() {
    const hours = this.padZero(this._date.getHours());
    const minutes = this.padZero(this._date.getMinutes());
    const seconds = this.padZero(this._date.getSeconds());

    this.clockStr = `${hours}:${minutes}:${seconds}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private interval() {
    interval(1000)
      .subscribe(() => {
        this._date.setSeconds(this._date.getSeconds() + 1);
        this.updateClockStr();
      });
  }

}
