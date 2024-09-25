import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeriodicTableComponent } from './features/periodic-table/periodic-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PeriodicTableComponent],
  template: ` <app-periodic-table></app-periodic-table>`
})
export class AppComponent {}
