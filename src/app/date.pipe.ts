import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'appDatePipe'
})
export class DatePipe implements PipeTransform {
  monthsName = [ 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  transform(value: string): string {
    const myDate = new Date(value);
    const result = myDate.getDate() + '  ' +
      this.monthsName[myDate.getMonth()] + ' ' + myDate.getUTCFullYear() + ' года';
    return result;
  }
}
