import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, DoCheck} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {AppHelp} from '../app-help';
@Component({
  selector: 'app-add',
  styleUrls: ['../popup.component.css'],
  templateUrl: './add-student.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddStudentComponent implements OnInit, DoCheck {
  myform: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.initForm();
  }
  ngDoCheck(): void {
    this.cdr.detectChanges();
  }
  submit(form) {
    const controls = this.myform.controls;
    let flag = 0;
    for (const key in controls) {
      if (this.isControlInvalid(key)) {
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      AppHelp.AddStudent.name = this.myform.value.name;
      AppHelp.AddStudent.surname = this.myform.value.surname;
      AppHelp.AddStudent.patronymic = this.myform.value.patronymic;
      AppHelp.AddStudent.datebd = new Date(this.myform.value.datebd);
      AppHelp.AddStudent.mark = this.myform.value.mark;
      AppHelp.ConfirmAdd = 1;
      AppHelp.HideAdd = 0;
    }
    flag = 0;
  }
  initForm() {
    this.myform = this.formBuilder.group(
      {
        name: new FormControl('имя', [Validators.required, Validators.pattern(/^[А-Яа-яЁё]+$/u),
          this.nameValidator]),
        surname: new FormControl('фамилия', [Validators.required, Validators.pattern(/^[А-Яа-яЁё]+$/u),
          this.surnameAndPatronymicValidator]),
        patronymic: new FormControl('отчество', [Validators.required, Validators.pattern(/^[А-Яа-яЁё]+$/u),
          this.surnameAndPatronymicValidator]),
        datebd: new FormControl('дата рождения',
          [Validators.required, Validators.pattern(
            '[0-9]{2}/[0-9]{2}/[0-9]{4}'), this.dateValidator]),
        mark: new FormControl('оценка', [Validators.required, Validators.pattern('[0-9]+(.[0-9])?')])
      });
  }
  cansel(): void {
    AppHelp.HideAdd = 0;
  }
  HideAddCheck(): number {
    return AppHelp.HideAdd;
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
  isControlInvalid(controlName: string): boolean {
    const control = this.myform.controls[controlName];
    const result = control.invalid;
    return result;
  }
}

