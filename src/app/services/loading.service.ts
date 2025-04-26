import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private requestCount = 0;

  constructor() {
  }

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  startLoading(): void {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  stopLoading(): void {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.loadingSubject.next(false);
    }
  }

  // Reset loading state (useful for error scenarios)
  resetLoading(): void {
    this.requestCount = 0;
    this.loadingSubject.next(false);
  }
}
