import {Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import {Student} from './app.component';
import {AppHelp} from './app-help';
@Component({
  selector: 'app-edit',
  template: `
    <div *ngIf="HideEdit" style="font-size: 2vh;">
      <h1 mat-dialog-title>Редактирование</h1>
    <form [formGroup]="myform" (ngSubmit)="submit(myform)">
      <input class="form-control" label="Имя"  formControlName="name">
      <div class="error" *ngIf="isControlInvalid('name')">
        Имя должно состоять только из русских букв и не совпадать с Фамилией и Отчеством
      </div>
      <input class="form-control"  formControlName="surname">
      <div class="error" *ngIf="isControlInvalid('surname')">
        Фамилия должна состоять только из русских букв и не совпадать с именем
      </div>
      <input class="form-control"   formControlName="patronymic">
      <div class="error" *ngIf="isControlInvalid('patronymic')">
        Отчество должно состоять только из русских букв и не совпадать с именем
      </div>
      <input class="form-control"   formControlName="datebd">
      <div class="error" *ngIf="isControlInvalid('datebd')">
        формат даты мм/дд/гггг, дата должна отличаться более, чем на 10 от текущей!
      </div>
      <input class="form-control" formControlName="mark">
      <div class="error" *ngIf="isControlInvalid('mark')">
        средний балл - только число в формате x.x или x
      </div>
      <mat-dialog-actions>
        <button mat-button type="submit" >Сохранить</button>
        <button mat-button [mat-dialog-close]="false">Отмена</button>
      </mat-dialog-actions>
    </form>
    </div>
  `
})
export class EditorComponent extends AppHelp implements OnInit {
  myform: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {
    super();
  }
  ngOnInit() {
    this.initForm();
  }
  submit(form) {
    const controls = this.myform.controls;
    let flag = 0;
    for (var key in controls) {
      if (this.isControlInvalid(key)) {
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      this.dialogRef.close(this.myform.value);
    }
    flag = 0;
  }

  initForm() {

    this.myform = this.formBuilder.group(
      {
        name: new FormControl(this.data.name, [Validators.required, Validators.pattern(/^[А-Яа-яЁё\s]+$/),
          this.nameValidator]),
        surname: new FormControl(this.data.surname, [Validators.required, Validators.pattern(/^[А-Яа-яЁё\s]+$/),
        this.surnameAndPatronymicValidator]),
        patronymic: new FormControl(this.data.patronymic, [Validators.required, Validators.pattern(/^[А-Яа-яЁё\s]+$/),
        this.surnameAndPatronymicValidator]),
        datebd: new FormControl(this.makedate(),
          [Validators.required, Validators.pattern(
          '[0-9]{2}/[0-9]{2}/[0-9]{4}'), this.dateValidator]),
        mark: new FormControl(<number>this.data.mark, [Validators.required, Validators.pattern('[0-9]+(.[0-9])?')])
      });
  }
  makedate(): string {
    let day: string;
    let mounth: string;
  if (this.data.datebd.getDate () < 10 ) {day = '0' + this.data.datebd.getDate(); } else {
    day = <string><unknown>this.data.datebd.getDate ();
  }
  if (this.data.datebd.getMonth() < 9 ) {mounth = '0' + (this.data.datebd.getMonth() + 1); } else {
    mounth = <string><unknown>(this.data.datebd.getMonth() + 1);
  }
  return mounth + '/' + day + '/' +  this.data.datebd.getFullYear();
}
  isControlInvalid(controlName: string): boolean {
    const control = this.myform.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
  private nameValidator = (control: FormControl) => {
    if (this.myform) {
      if (control.value === this.myform.value.surname ||
        control.value === this.myform.value.patronymic) {
        return {invalidName: 'Имя и/или Фамилия и/или Отчество совпадают'};
      } else {
        return null;
      }
    }
  }
  private surnameAndPatronymicValidator = (control: FormControl) => {
    if (this.myform) {
      if (control.value === this.myform.value.name) {
        return {invalidName: 'Имя и/или Фамилия и/или Отчество совпадают'};
      } else {
        return null;
      }
    }
  }
  private dateValidator = (control: FormControl) => {
    let value1;
    if (this.myform) {
      if (this.myform.value.datebd) {
        value1 = new Date(control.value);
      }
      const value2 = new Date();
      const value3 = new Date(value2.getFullYear() - 10, value2.getMonth(), value2.getDate());
      if (value1 > value3) {
        return {invalidName: 'Дата отличается меньше, чем на 10 лет от текущей'};
      } else {
        return null;
      }
    }
  }
}
