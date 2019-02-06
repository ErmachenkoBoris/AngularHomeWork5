import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ApplicationRef, DoCheck} from '@angular/core';
import {AppHelp} from './app-help';
import {Student} from './app-Student';
import {TouchMenuDirective} from './touchMenu.directive';
import {DatePipe} from './date.pipe';
import {StudentsArrDirtyPipe} from './studentsArrDirty.pipe';

@Component({
  selector: 'app-purchase',
  styleUrls: ['./app.component.css'],
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends AppHelp implements DoCheck {
  database: Student[] =
    [
      {name: 'Иван', surname: 'Соколов', patronymic: 'Борисович', datebd: new Date('2000-01-03'), mark: 5},
      {name: 'Петр', surname: 'Петров', patronymic: 'Андреевич', datebd: new Date('2002-5-3'), mark: 4.5},
      {name: 'Мария', surname: 'Рябова', patronymic: 'Михайловна', datebd: new Date('6/3/02001'), mark: 3},
      {name: 'Максим', surname: 'Антонов', patronymic: 'Никитич', datebd: new Date('1/29/2003'), mark: 2.5},
      {name: 'Никита', surname: 'Быстров', patronymic: 'Глебоич', datebd: new Date('10/28/2004'), mark: 4},
      {name: 'Анна', surname: 'Мезина', patronymic: 'Петровна', datebd: new Date('5/5/2005'), mark: 4},
      {name: 'Яна', surname: 'Богатова', patronymic: 'Семеновна', datebd: new Date('12/10/2000'), mark: 2}
    ];

  backcolor: string[] = ['white', 'white', 'white', 'white', 'white'];
  flag: boolean;
  surname: string;
  filter: any;
  maxdate: string;
  mindate: string;
  maxdb: any = new Date('2012-05-29');
  mindb: any = new Date('1950-05-29');
  on = 0;
  constructor(public app: ApplicationRef, public cdr: ChangeDetectorRef) {
    super();
  }
  ngDoCheck(): void {
    this.cdr.detectChanges();
  }

  changeStudent(St: Student, St2: Student) {
    for (let i = 0; i < this.database.length; i++) {
      let flag = 0;
      if (St.name === this.database[i].name &&
          St.surname === this.database[i].surname &&
          St.patronymic === this.database[i].patronymic &&
          St.datebd === this.database[i].datebd &&
          St.mark === this.database[i].mark) {
            flag = 1;
      }
      if (flag === 1) {
        flag = 0;
        this.database[i].name = St2.name;
        this.database[i].surname = St2.surname;
        this.database[i].patronymic = St2.patronymic;
        this.database[i].datebd = St2.datebd;
        this.database[i].mark = St2.mark;
      }
    }
  }
  deleteStudent(St: Student): number {
    for (let i = 0; i < this.database.length; i++) {
      let flag = 0;
      if (St.name === this.database[i].name &&
        St.surname === this.database[i].surname &&
        St.patronymic === this.database[i].patronymic &&
        St.datebd === this.database[i].datebd &&
        St.mark === this.database[i].mark) {
        flag = 1;
      }
      if (flag === 1 ) {
        flag = 0;
        this.database.splice(i, 1);
        return 1;
      }
    }
    return 0;
  }
  addStudent(St: Student): number {
    this.database[this.database.length] = new Student(St.name, St.surname, St.patronymic, St.datebd, St.mark);
    return 1;
  }
  openDeleteStudentDialog(St: Student): number {
    AppHelp.DelStudent = new Student(St.name, St.surname, St.patronymic, St.datebd, St.mark);
    AppHelp.HideDel = 1;
    return 1;
  }
  openAddDialog(): number {
    // AppHelp.AddStudent = new Student(St.name, St.surname, St.patronymic, St.datebd, St.mark);
    AppHelp.HideAdd = 1;
    return 1;
  }
  checkMark(mark: number): string {
    if (mark < 3 && this.flag === true) {
      return '#FA5C34';
    } else {return ''; }
  }
  checkSearch(surmame: string): string {
    if (this.surname === surmame) {
      return '#9CD4E8';
    }
  }
  changeFilter(val: string): void {
    this.filter = val;
  }
  createDate(): void {
    if (this.maxdate) {
      this.maxdb = new Date(this.maxdate);
    } else {
      this.maxdb = new Date('2012-05-29');
    }
    if (this.mindate) {
      this.mindb = new Date(this.mindate);
    } else {
      this.mindb = new Date('1999-05-29');
    }
  }
  checkConditionsFilters(mark: number, datebd1: Date): boolean {
    return mark > (this.filter || '1') && datebd1 > this.mindb && datebd1 < this.maxdb;
  }
  sortMark(): void {
    const length: number = this.database.length;
    let maxj: number;
    let tmpSt: Student = new Student('', '', '', '', 0);
    for (let i = 0; i < length; i++) {
      maxj = 0;
      tmpSt = this.database[i];
      for (let j = i; j < length; j++) {
        if (tmpSt.mark < this.database[j].mark) {
          tmpSt = this.database[j];
          maxj = j;
        }
      }
      if (maxj !== 0) {
        this.database[maxj] = this.database[i];
        this.database[i] = tmpSt;
      }
    }
  }
  sortDate(): void {
    const length: number = this.database.length;
    let maxj: number;
    let tmpSt: Student = new Student('', '', '', '', 0);
    for (let i = 0; i < length; i++) {
      maxj = 0;
      tmpSt = this.database[i];
      for (let j = i; j < length; j++) {
        if (tmpSt.datebd < this.database[j].datebd) {
          tmpSt = this.database[j];
          maxj = j;
        }
      }
      if (maxj !== 0) {
        this.database[maxj] = this.database[i];
        this.database[i] = tmpSt;
      }
    }
  }
  sortName(): void {
    const length: number = this.database.length;
    let maxj: number;
    let tmpSt: Student = new Student('', '', '', '', 0);
    for (let i = 0; i < length; i++) {
      maxj = 0;
      tmpSt = this.database[i];
      for (let j = i; j < length; j++) {
        if (tmpSt.name > this.database[j].name) {
          tmpSt = this.database[j];
          maxj = j;
        }
      }
      if (maxj !== 0) {
        this.database[maxj] = this.database[i];
        this.database[i] = tmpSt;
      }
    }
  }
  sortSerName(): void {
    const length: number = this.database.length;
    let maxj: number;
    let tmpSt: Student = new Student('', '', '', '', 0);
    for (let i = 0; i < length; i++) {
      maxj = 0;
      tmpSt = this.database[i];
      for (let j = i; j < length; j++) {
        if (tmpSt.surname > this.database[j].surname) {
          tmpSt = this.database[j];
          maxj = j;
        }
      }
      if (maxj !== 0) {
        this.database[maxj] = this.database[i];
        this.database[i] = tmpSt;
      }
    }
  }
  sortPatronymic(): void {
    const length: number = this.database.length;
    let maxj: number;
    let tmpSt: Student = new Student('', '', '', '', 0);
    for (let i = 0; i < length; i++) {
      maxj = 0;
      tmpSt = this.database[i];
      for (let j = i; j < length; j++) {
        if (tmpSt.patronymic > this.database[j].patronymic) {
          tmpSt = this.database[j];
          maxj = j;
        }
      }
      if (maxj !== 0) {
        this.database[maxj] = this.database[i];
        this.database[i] = tmpSt;
      }
    }
  }
  changeBackColorThr(index: number): void {
    for (let i = 0; i < this.backcolor.length; i++) {
      this.backcolor[i] = 'white';
    }
    this.backcolor[index] = '#98FB98';
  }
  turnOn(value: number): void {
    this.on = value;
  }
  openEditor(St: Student) {
    AppHelp.FromEditStudent = new Student(St.name, St.surname, St.patronymic, St.datebd, St.mark);
    AppHelp.HideEdit = 1;
  }
  checkAdd(): number {
    if ( AppHelp.ConfirmAdd === 1) {
      AppHelp.ConfirmAdd = 0;
      this.addStudent(AppHelp.AddStudent);
    }
    return 1;
  }
  checkDel(): number {
    if ( AppHelp.ConfirmDel === 1) {
      AppHelp.ConfirmDel = 0;
      this.deleteStudent(AppHelp.DelStudent);
    }
    return 1;
  }
  checkEdit(): number {
    if ( AppHelp.ConfirmEdit === 1) {
      AppHelp.ConfirmEdit = 0;
      this.changeStudent(AppHelp.FromEditStudent, AppHelp.EditStudent);
    }
    return 1;
  }
  checkAddOnly(): number {
    return AppHelp.HideAdd;
  }
  checkDelOnly(): number {
    return AppHelp.HideDel;
  }
  checkEditOnly(): number {
    return AppHelp.HideEdit;
  }
  changBack(): number {
    return AppHelp.HideEdit || AppHelp.HideDel || AppHelp.HideAdd;

}
  gerWidth(): number {
    return document.getElementById('1').offsetWidth;
  }
  getLenth(): number {
    return document.getElementById('1').offsetHeight;
  }

}












