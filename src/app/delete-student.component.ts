import {Component, OnInit, DoCheck} from '@angular/core';
import {AppHelp} from './app-help';
import {Student} from './app-Student';

@Component({
  selector: 'app-dell',
  styleUrls: ['./popup.component.css'],
  templateUrl: 'delete-student.component.html'
})
export class DeleteStudentComponent extends  AppHelp implements OnInit, DoCheck {
  Stud: Student;
  constructor(
  ) {
    super();
    this.Stud = new Student('', '', '', '', 0)
  }
  ngOnInit() {
  }
  ngDoCheck() {
    this.Stud = AppHelp.DelStudent;
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
