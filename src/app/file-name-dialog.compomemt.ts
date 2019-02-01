import {Component, OnInit, DoCheck} from '@angular/core';
import {AppHelp} from './app-help';
import {Student} from './app-Student';

@Component({
  selector: 'app-dell',
  template: `
    <div *ngIf="HideDelCheck()" style="font-size: 2vh;
        background: #ff8765;
        position:absolute;
        top:50%;
        left:50%;
        margin:-100px 0 0 -200px;">
      <h1>Подтверждение</h1>
      <div style="font-size: 2vh;" [title]="HideDelCheck()">
        Вы действительно хотите <br>удалить студента {{Stud.surname}}?
        <button (click)="submit()">Удалить</button>
        <button (click)="cansel()">Отмена</button>
      </div>
    </div>
  `
})
export class FileNameDialogComponent extends  AppHelp implements OnInit, DoCheck {
  Stud: Student;
  constructor(
  ) {
    super();
    this.Stud = new Student('', '', '', '', 0)
  }
  ngOnInit() {
  }
  ngDoCheck() {
    this.Stud = AppHelp.FromEditStudent;
  }
  HideDelCheck(): number {
    return AppHelp.HideDel;
  }
  submit(): void {
    AppHelp.ConfirmDel = 1;
    this.cansel();
  }
  cansel(): void {
    AppHelp.HideDel = 0;
  }
}

