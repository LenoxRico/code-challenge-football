import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoaderState {
  show: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private spinnerStatusState = new Subject<any>();

  constructor() {}

  displaySpinner(value: boolean) {
    this.spinnerStatusState.next(<LoaderState>{ show: value });
  }

  getSpinner() {
    return this.spinnerStatusState;
  }
}
