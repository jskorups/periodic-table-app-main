import { Component, DestroyRef, inject, input, OnInit, output, signal, WritableSignal, computed, Signal, ChangeDetectionStrategy } from '@angular/core';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';
import { FilterData } from '../../../core/models/filter-data.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type FilterForm = {
  filter: FormControl<string | null>;
};

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatInput, MatFormField, ReactiveFormsModule, MatProgressSpinner, MatSuffix, MatLabel],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent<T> implements OnInit {
  isFiltering: WritableSignal<boolean> = signal(false);

  public dataSource = input.required<T[]>();
  public filterData = output<FilterData<T>>();
  private matTableDataSource = computed(() => new MatTableDataSource(this.dataSource()));
  private destroyRef = inject(DestroyRef);
  public filterForm: Signal<FormGroup<FilterForm>> = signal(
    new FormGroup<FilterForm>({
      filter: new FormControl<string | null>(null)
    })
  );

  ngOnInit() {
    this.listenToFilterChanges();
  }

  private listenToFilterChanges() {
    this.filterForm()
      .controls.filter.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.isFiltering.set(true)),
        debounceTime(2000),
        distinctUntilChanged()
      )
      .subscribe((filterValue: string | null) => {
        const trimmedFilterValue = filterValue ? filterValue.trim().toLowerCase() : '';

        if (!trimmedFilterValue) {
          this.filterData.emit({ filteredData: this.dataSource(), searchValue: '' });
        }
        else {
          this.matTableDataSource().filter = trimmedFilterValue;
          this.filterData.emit({ filteredData: this.matTableDataSource().filteredData, searchValue: trimmedFilterValue });
        }

        this.isFiltering.set(false);
      });
  }
}
