import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {TestCommand} from '@angular/cli/commands/test-impl';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Student} from './app.component';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  template: `
    <div style="font-size: 2vh;">
      <h1 mat-dialog-title>Редактирование</h1>
    <form [formGroup]="myform" (ngSubmit)="submit(myform)">
      <input class="form-control" label="Имя"  formControlName="name">
      <div class="error" *ngIf="isControlInvalid('name')">
        Имя должно состоять только из русских букв
      </div>
      <input class="form-control"  formControlName="surname">
      <div class="error" *ngIf="isControlInvalid('surname')">
        Фамилия должна состоять только из русских букв
      </div>
      <input class="form-control"   formControlName="patronymic">
      <div class="error" *ngIf="isControlInvalid('patronymic')">
        Отчество должно состоять только из русских букв
      </div>
      <input class="form-control"   formControlName="datebd">
      <div class="error" *ngIf="isControlInvalid('datebd')">
        формат даты дд-мм-гггг
      </div>
      <input class="form-control" formControlName="mark">
      <div class="error" *ngIf="isControlInvalid('mark')">
        средний балл - только число
      </div>
      <mat-dialog-actions>
        <button mat-button type="submit" >Сохранить</button>
        <button mat-button [mat-dialog-close]="false">Отмена</button>
      </mat-dialog-actions>
    </form>
    </div>
  `
})
export class EditorComponent implements OnInit {
  myform: FormGroup;
    constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {}
  ngOnInit() {
    this.initForm();
  }
  submit(form) {
    const controls = this.myform.controls;
    let key: any;
    var flag = 0;
   // controls.forEach(controlname-key in controls)
    for (key in controls) {
      console.log(key);
      if (this.isControlInvalid(key)) {
        flag = 1;
        console.log('sddsds');
      }
    }
    if (flag === 0) {
      this.dialogRef.close(this.myform.value);
      // let Stud=new Student()
      console.log(this.myform.value);
    } else {
      console.log(9999);
    }
     flag = 0;
  }
  initForm() {
    this.myform = this.formBuilder.group(
        {name: new FormControl(this.data.name, [Validators.required, Validators.pattern(/^[А-Яа-яЁё\s]+$/ )]),
          surname: new FormControl(this.data.surname, [Validators.required, Validators.pattern(/^[А-Яа-яЁё\s]+$/ )]),
          patronymic: new FormControl(this.data.patronymic, [Validators.required, Validators.pattern(/^[А-Яа-яЁё\s]+$/ )]),
          datebd: new FormControl(this.data.datebd.toDateString(), [Validators.required, Validators.pattern(
            /[0-9]{2}\.[0-9]{2}\.[0-9]{4}/)]),
          mark: new FormControl(this.data.mark, [Validators.required, Validators.pattern(/^[0-9]+$/ )])});
    console.log(this.data);
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.myform.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }
}
