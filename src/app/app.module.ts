import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileNameDialogComponent} from './file-name-dialog.compomemt';
import {EditorComponent} from './editor.component';
import {AddStudentComponent} from './add-student.component';
import {AppComponent} from './app.component';
@NgModule({
  exports: [
    // CDK
  ]
})
export class MaterialModule {}
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [AppComponent, FileNameDialogComponent, AddStudentComponent, EditorComponent],
  bootstrap: [AppComponent, FileNameDialogComponent, AddStudentComponent, EditorComponent],
  providers: [],
})
export class AppModule {}


