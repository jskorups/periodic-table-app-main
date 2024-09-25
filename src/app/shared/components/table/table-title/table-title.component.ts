import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table-title',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './table-title.component.html',
  styleUrl: './table-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableTitleComponent {
  public title = input.required<string>();
  public icon = input<string>();
}
