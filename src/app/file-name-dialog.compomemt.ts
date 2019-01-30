import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {TestCommand} from '@angular/cli/commands/test-impl';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-test',
  encapsulation: ViewEncapsulation.None,
  template: `
    <h1 mat-dialog-title>Подтверждение</h1>
    <div style="font-size: 2vh;">
    <mat-dialog-content >
      Вы действительно хотите удалить студента {{data.name}}?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Удалить</button>
      <button mat-button [mat-dialog-close]="false">Отмена</button>
    </mat-dialog-actions>
    </div>
  `
})
export class FileNameDialogComponent implements OnInit {
  // data: string;
  constructor(
    public dialogRef: MatDialogRef<FileNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit() {

  }
}

