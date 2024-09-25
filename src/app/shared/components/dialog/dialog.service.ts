import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogData } from '../../../core/models/dialog-data.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private matDialog = inject(MatDialog);

  public openDialog<T, D = DialogData<T>>(component: ComponentType<T>, data?: D) {
    const dialogRef = this.matDialog.open<T, D>(component, { data });

    return dialogRef.afterClosed();
  }
}
