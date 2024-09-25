import { Component, computed, Inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { PeriodicElement } from '../../../core/models/domain/periodic-element.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatFabButton } from '@angular/material/button';

type EditTableRowForm = {
  position: FormControl<number | null>;
  name: FormControl<string | null>;
  weight: FormControl<number | null>;
  symbol: FormControl<string | null>;
};

@Component({
  selector: 'app-edit-periodic-table-row',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, TitleCasePipe, MatDialogActions, MatButton, MatFabButton],
  templateUrl: './edit-periodic-table-row.component.html',
  styleUrl: './edit-periodic-table-row.component.scss'
})
export class EditPeriodicTableRowComponent implements OnInit {
  public editForm: Signal<FormGroup<EditTableRowForm>> = signal(
    new FormGroup<EditTableRowForm>({
      position: new FormControl<number | null>({ value: null, disabled: true }, [Validators.required]),
      name: new FormControl<string | null>(null, [Validators.required]),
      weight: new FormControl<number | null>(null, [Validators.required]),
      symbol: new FormControl<string | null>(null, [Validators.required])
    })
  );

  public title: WritableSignal<string> = signal('');
  public editFormControls = computed(() => Object.keys(this.editForm().controls));

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: { data: PeriodicElement; title: string },
    private dialogRef: MatDialogRef<EditPeriodicTableRowComponent>
  ) {}

  ngOnInit(): void {
    this.initializeFormDataAndTitle();
  }

  private initializeFormDataAndTitle(): void {
    this.title.set(this._data.title);
    this.editForm().controls.position.setValue(this._data.data.position);
    this.editForm().controls.name.setValue(this._data.data.name);
    this.editForm().controls.weight.setValue(this._data.data.weight);
    this.editForm().controls.symbol.setValue(this._data.data.symbol);
  }

  public save(): void {
    if (!this.editForm().valid) return;
    const updatedData = {
      position: this.editForm().getRawValue().position,
      name: this.editForm().value.name,
      weight: this.editForm().value.weight,
      symbol: this.editForm().value.symbol
    };

    this.dialogRef.close(updatedData);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
