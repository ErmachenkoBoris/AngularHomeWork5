import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'appStudentnamesPipe'
})
export class StudentnamesPipe implements PipeTransform {
  transform(value: string, args1: string, args2: string): string {
    const result = value + '  ' +
      args1 + ' по отчеству ' + args2;
    return result;
  }
}
