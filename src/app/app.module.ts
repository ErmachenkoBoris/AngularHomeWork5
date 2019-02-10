import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, ApplicationRef, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DeleteStudentComponent} from './delete-student/delete-student.component';
import {EditorComponent} from './editor/editor.component';
import {AddStudentComponent} from './add-student/add-student.component';
import {AppComponent} from './app.component';
import {TouchMenuDirective} from './touchMenu.directive';
import {MouseDirective} from './mouse.directive';
import {DatePipe} from './date.pipe';
import {StudentnamesPipe} from './studentnames.pipe';
import {StudentsArrDirtyPipe} from './studentsArrDirty.pipe';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ],
  declarations: [AppComponent, DeleteStudentComponent, AddStudentComponent, EditorComponent, TouchMenuDirective, MouseDirective,
  DatePipe, StudentnamesPipe, StudentsArrDirtyPipe],
  bootstrap: [AppComponent, DeleteStudentComponent, AddStudentComponent, EditorComponent],
  providers: [],
})
export class AppModule {
  constructor (@Inject(ApplicationRef) applicationRef) {
  }
}


