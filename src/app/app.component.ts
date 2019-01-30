import { Component, OnInit } from '@angular/core';
import { FileNameDialogComponent } from './file-name-dialog.compomemt';
import { EditorComponent } from './editor.component';
import { AddStudentComponent } from './add-student.component';
import {VERSION, MatDialog, MatDialogRef} from '@angular/material';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { stringify } from '@angular/core/src/render3/util';
import { variable } from '@angular/compiler/src/output/output_ast';
export class Student {
  name: string;
  surname: string;
  patronymic: string;
  datebd: any;
  mark: number;

  constructor(name: string, surname: string, patronymic: string, datebd: any, mark: number) {

    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.datebd = datebd;
    this.mark = mark;
  }
}

@Component({
  selector: 'app-purchase',
  styleUrls: ['./app.component.css'],
  templateUrl: 'app.component.html'
})
export class AppComponent {

  database: Student[] =
    [
      {name: 'Иван', surname: 'Соколов', patronymic: 'Борисович', datebd: new Date('7 March 2000'), mark: 5},
      {name: 'Петр', surname: 'Петров', patronymic: 'Андреевич', datebd: new Date('21 March 2002'), mark: 4.5},
      {name: 'Мария', surname: 'Рябова', patronymic: 'Михайловна', datebd: new Date('20 March 2001'), mark: 3},
      {name: 'Максим', surname: 'Антонов', patronymic: 'Никитич', datebd: new Date('11 March 2003'), mark: 2.5},
      {name: 'Никита', surname: 'Быстров', patronymic: 'Глебоич', datebd: new Date('18 March 2004'), mark: 4},
      {name: 'Анна', surname: 'Мезина', patronymic: 'Петровна', datebd: new Date('19 March 2005'), mark: 4},
      {name: 'Яна', surname: 'Богатова', patronymic: 'Семеновна', datebd: new Date('30 March 2000'), mark: 2}
    ];
  backcolor: string[] = ['white', 'white', 'white', 'white', 'white'];
  flag: boolean;
  surname: string;
  filter: any;
  maxdate: string;
  mindate: string;
  maxdb: any = new Date('2012-05-29');
  mindb: any = new Date('1999-05-29');
  on = 0;
  delete = 0;
  version = VERSION;

  fileNameDialogRef: any;
  fileNameDialogEd: any;
  fileNameDialogAd: any;

  constructor(public dialog: MatDialog) {}
  changeStudent(St: Student, St2: Student) {
    for (let i = 0; i < this.database.length; i++) {
      if (St === this.database[i]) {
        this.database[i].name = St2.name;
        this.database[i].surname = St2.surname;
        this.database[i].patronymic = St2.patronymic;
        this.database[i].datebd = St2.datebd;
        this.database[i].mark = St2.mark;
        console.log(this.database[i].mark);
        console.log(St2);
        console.log(this.database.length);
      }
    }
  }

  deleteStudent(St: Student): void {
    for (let i = 0; i < this.database.length; i++) {
      if (St === this.database[i]) {
        this.database.splice(i, 1);
        console.log(this.database.length);
      }
    }
    console.log(this.database.length);
  }
  addStudent(St: Student): void {
    this.database[this.database.length] = new Student(St.name, St.surname, St.patronymic, St.datebd, St.mark);
    console.log(this.database.length);
  }
  openDeleteStudentDialog(St: Student): void {
    this.fileNameDialogRef = this.dialog.open(FileNameDialogComponent, {data: {name: St.surname}});
    this.fileNameDialogRef.afterClosed().subscribe(result => {
      this.delete = result;
      console.log(this.delete);
      if (this.delete) {
        this.deleteStudent(St);
      }
    });

  }
  openEditorDialog(St: Student): void {
    this.fileNameDialogEd = this.dialog.open(EditorComponent, {
      data: St
    });
    this.fileNameDialogEd.afterClosed().subscribe(result => { if (result) {
      const St2 = new Student(result.name, result.surname, result.patronymic, new Date(result.datebd), result.mark);
      this.changeStudent(St, St2); }
    });
  }
  openAddDialog(St: Student): void {
    this.fileNameDialogAd = this.dialog.open(AddStudentComponent);
    this.fileNameDialogAd.afterClosed().subscribe(result => { if (result) {
      const St2 = new Student(result.name, result.surname, result.patronymic, new Date(result.datebd), result.mark);
      this.addStudent(St2);
    }
    });
  }
  checkMark(mark: number): string {
    if (mark < 3 && this.flag === true) {
      return '#FA5C34';
    }
  }

  checkSearch(surmame: string): string {
    if (this.surname === surmame) {
      return '#9CD4E8';
    }
  }

  changeFilter(val: string): void {
    this.filter = val;
    console.log(1);
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

  checkConditionsFilters(mark: number, datebd: Date): boolean {
    return mark > (this.filter || '1') && datebd > this.mindb && datebd < this.maxdb;
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

}












