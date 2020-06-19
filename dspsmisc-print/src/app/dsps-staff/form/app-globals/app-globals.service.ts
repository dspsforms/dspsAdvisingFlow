import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppGlobalsService {

  private isGrid = true;
  private gridValueChange = new Subject<{ grid: boolean }>();

  constructor() { }

  

  public getGrid() {
    return this.isGrid;
  }

  public getGridValueChangeListener() {
    return this.gridValueChange.asObservable();
  }

  public toggleGrid() {
    this.isGrid = !this.isGrid;
    this.gridValueChange.next({ grid: this.isGrid });
  }
}
