import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {TestCommand} from '@angular/cli/commands/test-impl';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {Student} from './app.component';

@Component({
  template: `
    <div style="font-size: 1vh;">
      <h1 mat-dialog-title>Добавление студента</h1>
    <form [formGroup]="myform" (ngSubmit)="submit(myform)">
      <input class="form-control" label="Имя"  formControlName="name">
      <input class="form-control"  formControlName="surname">
      <input class="form-control" label="Отчество"  formControlName="patronymic">
      <input class="form-control" label="Дата Рождения"  formControlName="datebd">
      <input class="form-control" label="Имя" formControlName="mark">
      <mat-dialog-actions>
        <button mat-button type="submit" >Сохранить</button>
        <button mat-button [mat-dialog-close]="false">Отмена</button>
      </mat-dialog-actions>
    </form>
    </div>
  `
})
export class AddStudentComponent implements OnInit {
  myform: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddStudentComponent>
  ) {}
  ngOnInit() {
    this.initForm();
  }
  submit(form) {
    console.log(11111);
    this.dialogRef.close(this.myform.value);
    // let Stud=new Student()
    console.log(this.myform.value);
  }
  initForm() {
    this.myform = this.formBuilder.group(
      {name: new FormControl('Имя'),surname: new FormControl('Фамилия'),
        patronymic: new FormControl('Отчество'), datebd: new FormControl('Дата рождения'),
        mark: new FormControl('Средний балл')});
  }
}

