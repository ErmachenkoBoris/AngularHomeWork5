import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DeleteStudentComponent} from './delete-student.component';
import {EditorComponent} from './editor.component';
import {AddStudentComponent} from './add-student.component';
import {AppComponent} from './app.component';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [AppComponent, DeleteStudentComponent, AddStudentComponent, EditorComponent],
  bootstrap: [AppComponent, DeleteStudentComponent, AddStudentComponent, EditorComponent],
  providers: [],
})
export class AppModule {}


