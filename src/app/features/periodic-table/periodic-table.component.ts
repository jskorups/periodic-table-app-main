import { Component, computed, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { PeriodicElement } from '../../core/models/domain/periodic-element.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TableComponent } from '../../shared/components/table/table.component';
import { TableColumn } from '../../core/models/table-column.model';
import { TableService } from '../../shared/components/table/table.service';
import { TableTitle } from '../../shared/components/table/models/table-title.model';
import { TableAction } from '../../core/models/action.model';
import { DialogService } from '../../shared/components/dialog/dialog.service';
import { filter } from 'rxjs';
import { EditPeriodicTableRowComponent } from './edit-periodic-table-row/edit-periodic-table-row.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { FilterData } from '../../core/models/filter-data.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [MatProgressSpinner, TableComponent, FilterComponent, FilterComponent, JsonPipe],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss'
})
export class PeriodicTableComponent<T> implements OnInit {
  public searchValue: WritableSignal<string> = signal('');
  public displayedPeriodicTableData = computed(() => this.getFilteredPeriodicTableData());
  public periodicTableData: WritableSignal<PeriodicElement[]> = signal([]);
  public tableColumns: WritableSignal<TableColumn[]> = signal([]);
  public tableTitleData: TableTitle;
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);
  private tableService = inject(TableService);
  public tableActions: WritableSignal<TableAction<PeriodicElement>[]> = signal([]);

  public handleFiltering(filterData: FilterData<PeriodicElement>): void {
    this.searchValue.set(filterData.searchValue);
  }

  public getFilteredPeriodicTableData(): PeriodicElement[] {
    const lowerCaseFilter = this.searchValue().toLowerCase();
    return this.periodicTableData().filter((el) => Object.values(el).some((val) => val.toString().toLowerCase().includes(lowerCaseFilter)));
  }

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.getDataAndInitializeTable();
    this.setTableActions();
  }

  private getDataAndInitializeTable(): void {
    this.dataService.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      this.periodicTableData.set(data);
      this.initializeTableTitle();
      this.initializeTableColumns();
    });
  }

  private initializeTableTitle(): void {
    this.tableTitleData = {
      title: 'Periodic Table',
      icon: 'home'
    };
  }

  private initializeTableColumns(): void {
    this.tableColumns.set(this.tableService.initializeTableColumns(this.periodicTableData(), this.tableActions()));
  }

  private setTableActions(): void {
    this.tableActions.set([{
      name: 'Edit',
      action: (row: PeriodicElement) => {
        this.dialogService
          .openDialog(EditPeriodicTableRowComponent, { data: row, title: 'Edit' })
          .pipe(takeUntilDestroyed(this.destroyRef), filter(Boolean))
          .subscribe((result: PeriodicElement) => {
            const updatedData = this.periodicTableData().map((el) => (el.position === result.position ? result : el));
            this.periodicTableData.set(updatedData);
            if (this.searchValue && this.searchValue() !== '') {
              this.handleFiltering({ filteredData: updatedData, searchValue: this.searchValue() });
            }
          });
      }
    } as TableAction<PeriodicElement>]);
  }

}

