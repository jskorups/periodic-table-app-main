import { Component, computed, input, signal, ViewEncapsulation, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { TableColumn } from '../../../core/models/table-column.model';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { TableTitleComponent } from './table-title/table-title.component';
import { TableAction } from '../../../core/models/action.model';
import { FilterComponent } from "../filter/filter.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButton, TitleCasePipe, TableTitleComponent, JsonPipe, FilterComponent, FilterComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TableComponent<T> implements OnInit{
  ngOnInit(): void {


  }
  tableTitle = input<string>();
  tableTitleIconName = input<string>();
  actions = input<TableAction<T>[]>();
  dataSource = input.required<T[]>();
  columns = input.required<TableColumn[]>();
  columnsToDisplay = computed(() => this.columns().map((column) => column.name));
  defaultTitle: string = 'Table';

}
