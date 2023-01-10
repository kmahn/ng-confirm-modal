import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ConfirmDialogOptions } from '../../types';

@Component({
  selector: 'lf-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(
    @Inject(DIALOG_DATA) public options: ConfirmDialogOptions,
    public dialogRef: DialogRef
  ) { }
}
