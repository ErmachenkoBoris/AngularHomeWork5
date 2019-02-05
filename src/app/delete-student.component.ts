import {Component, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {AppHelp} from './app-help';
import {Student} from './app-Student';

@Component({
  selector: 'app-dell',
  styleUrls: ['./popup.component.css'],
  templateUrl: 'delete-student.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteStudentComponent extends  AppHelp implements OnInit, DoCheck {
  Stud: Student;
  constructor( public cdr: ChangeDetectorRef
  ) {
    super();
    this.Stud = new Student('', '', '', '', 0)
  }
  ngOnInit() {
  }
  ngDoCheck() {
    this.Stud = AppHelp.DelStudent;
    this.cdr.detectChanges();
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
