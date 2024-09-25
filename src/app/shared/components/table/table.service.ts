import { Injectable } from '@angular/core';
import { TableColumn } from '../../../core/models/table-column.model';
import { Action } from 'rxjs/internal/scheduler/Action';
import { TableAction } from '../../../core/models/action.model';

@Injectable({
  providedIn: 'root'
})
export class TableService<T extends Object> {
  public initializeTableColumns(tableData: T[], actions: TableAction<T>[]): TableColumn[] {
    if (!tableData.length) {
      return [];
    }
    const columns=  Object.keys(tableData[0]).map((key) => ({
      name: key.toLowerCase(),
      title: key,
      width: key
    }));

    if (actions.length) {
        columns.push({
          name: 'actions',
          title: 'Actions',
          width: 'auto'
        });
      }

      return columns;
    }
}
