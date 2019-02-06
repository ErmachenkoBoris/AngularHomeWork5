import { Pipe, PipeTransform } from '@angular/core';
import {Student} from './app-Student';
@Pipe({
  name: 'appStudentsArrDirtyPipe',
  pure: false
})
export class StudentsArrDirtyPipe implements PipeTransform {
  transform(array: Student[]): string {
    const myArr: string[] = [];
    for (let i = 0; i < array.length; i++) {
      myArr[i] = ' ' + array[i].name + ' ' + array[i].surname + ' ' + array[i].patronymic;
    }
    return myArr.join(';');
  }
}
