import { Component, computed, input, signal, ViewEncapsulation, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { TableColumn } from '../../../core/models/table-column.model';
import { CommonModule, JsonPipe, TitleCasePipe } from '@angular/common';
import { TableTitleComponent } from './table-title/table-title.component';
import { TableAction } from '../../../core/models/action.model';
import { FilterComponent } from "../filter/filter.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButton, TitleCasePipe, TableTitleComponent, JsonPipe, FilterComponent, FilterComponent, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TableComponent<T> implements OnInit{
  ngOnInit(): void {


  }
  public tableTitle = input<string>();
  public tableTitleIconName = input<string>();
  public actions = input<TableAction<T>[]>();
  public dataSource = input.required<T[]>();
  public columns = input.required<TableColumn[]>();
  public columnsDataDisplay = computed(() =>
    this.columns().map((column) => {
      return {
        name: column.name,
        width: column.width ? column.width : 'auto'
      };
    })
  );
  public columnsNameToDisplay = computed(() => this.columns().map((column) => column.name));
  public defaultTitle: string = 'Table';
}
