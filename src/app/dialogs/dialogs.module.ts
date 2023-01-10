import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { DialogModule } from '@angular/cdk/dialog';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
  ],
  exports: [
    ConfirmDialogComponent
  ]
})
export class DialogsModule {
  static injector: Injector;

  constructor(injector: Injector) {
    DialogsModule.injector = injector;
  }
 }
