import {Component, OnInit, DoCheck} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Student} from './app-Student';
import {AppHelp} from './app-help';
@Component({
  selector: 'app-edit',
  template: `
    <div *ngIf="HideEditCheck() " [title]="HideEditCheck()" class="menu" >
    <form [formGroup] = "myform"  (ngSubmit)="submit(myform)" >
      <div style="font-size: 2vh;
        background: #008080;
        position:absolute;
        top:50%;
        left:50%;
        margin:-100px 0 0 -200px;">
      <h1 >Редактирование Студента <br></h1>
      <input class="form-control" label="Имя"   formControlName="name">
      <div class="error" *ngIf="isControlInvalid('name')">
        Имя должно состоять только из русских букв(без пробелов) и не совпадать с Фамилией и Отчеством
      </div>
      <input class="form-control"  formControlName="surname">
      <div class="error" *ngIf="isControlInvalid('surname')">
        Фамилия должна состоять только из русских букв(без пробелов) и не совпадать с именем
      </div>
      <input class="form-control"   formControlName="patronymic">
      <div class="error" *ngIf="isControlInvalid('patronymic')">
        Отчество должно состоять только из русских букв(без пробелов) и не совпадать с именем
      </div>
      <input class="form-control"   formControlName="datebd">
      <div class="error" *ngIf="isControlInvalid('datebd')">
        формат даты мм/дд/гггг, дата должна отличаться более, чем на 10 от текущей!
      </div>
      <input class="form-control"  formControlName="mark">
      <div class="error" *ngIf="isControlInvalid('mark')">
        средний балл - только число в формате x.x или x
      </div>
        <button type="submit" >Сохранить</button>
        <button  (click)="HideEditNull()">Отмена</button>
      </div>
    </form>
      </div>
  `
})
export class EditorComponent extends AppHelp implements OnInit, DoCheck {
  myform: FormGroup;
  Stud: Student;
  firstTime = 0;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    super();
  }
  ngOnInit() {
    this.initForm();
  }
  ngDoCheck(): number {
    if (AppHelp.HideEdit && !this.firstTime) {
      this.firstTime = 1;
      this.myform = this.formBuilder.group(
        {
          name: new FormControl(AppHelp.FromEditStudent.name, [Validators.required, Validators.pattern(/^[А-Яа-яЁё]+$/u),
            this.nameValidator]),
          surname: new FormControl(AppHelp.FromEditStudent.surname, [Validators.required, Validators.pattern(/^[А-Яа-яЁё]+$/u),
            this.surnameAndPatronymicValidator]),
          patronymic: new FormControl(AppHelp.FromEditStudent.patronymic, [Validators.required, Validators.pattern(/^[А-Яа-яЁё]+$/u),
            this.surnameAndPatronymicValidator]),
          datebd: new FormControl(this.makedate(),
            [Validators.required, Validators.pattern(
              '[0-9]{2}/[0-9]{2}/[0-9]{4}'), this.dateValidator]),
          mark: new FormControl(AppHelp.FromEditStudent.mark, [Validators.required, Validators.pattern('[0-9]+(.[0-9])?')])
        });
      return 1;
    }
  }
  submit(form) {
    const controls = this.myform.controls;
    var flag = 0;
    for (let mykey in controls) {
      if (this.isControlInvalid(mykey)) {
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      AppHelp.EditStudent.name = this.myform.value.name;
      AppHelp.EditStudent.surname = this.myform.value.surname;
      AppHelp.EditStudent.patronymic = this.myform.value.patronymic;
      AppHelp.EditStudent.datebd = new Date(this.myform.value.datebd);
      AppHelp.EditStudent.mark = this.myform.value.mark;
      AppHelp.ConfirmEdit = 1;
      AppHelp.HideEdit = 0;
      this.firstTime = 0;
    }
    flag = 0;
  }
  initForm() {
    this.myform = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required, Validators.pattern(/^[А-Яа-яЁё\s]+$/iu),
          this.nameValidator]),
        surname: new FormControl('', [Validators.required, Validators.pattern(/^[А-Яа-яЁё\s]+$/),
        this.surnameAndPatronymicValidator]),
        patronymic: new FormControl('', [Validators.required, Validators.pattern(/^[А-Яа-яЁё\s]+$/),
        this.surnameAndPatronymicValidator]),
        datebd: new FormControl(null,
          [Validators.required, Validators.pattern(
          '[0-9]{2}/[0-9]{2}/[0-9]{4}'), this.dateValidator]),
        mark: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(.[0-9])?')])
      });
  }
  makedate(): string {
    let day: string;
    let mounth: string;
    if (AppHelp.FromEditStudent.datebd.getDate() < 10) {
      day = '0' + AppHelp.FromEditStudent.datebd.getDate();
    } else {
       day = <string><unknown>AppHelp.FromEditStudent.datebd.getDate ();
      }
    if (AppHelp.FromEditStudent.datebd.getMonth() < 9 ) {mounth = '0' + (AppHelp.FromEditStudent.datebd.getMonth() + 1); } else {
      mounth = <string><unknown>(AppHelp.FromEditStudent.datebd.getMonth() + 1);
       }
       return mounth + '/' + day + '/' +  AppHelp.FromEditStudent.datebd.getFullYear();
      return '';
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
  HideEditCheck(): number {
    return AppHelp.HideEdit;
  }
  HideEditNull(): void {
    this.firstTime = 0;
    AppHelp.HideEdit = 0;
  }

}
