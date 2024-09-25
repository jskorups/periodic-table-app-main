import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table-title',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './table-title.component.html',
  styleUrl: './table-title.component.scss'
})
export class TableTitleComponent {
  title = input.required<string>();
  icon = input<string>();
}
