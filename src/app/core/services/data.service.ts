import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeriodicElement } from '../models/domain/periodic-element.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataUrl: string = 'data/periodic-data.json';
  data$: Observable<PeriodicElement[]> = inject(HttpClient).get<PeriodicElement[]>(this.dataUrl);
}
