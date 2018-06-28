import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DependencyService } from './dependency.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private dependency: DependencyService) { }

  getName(): string {
    return 'the main service';
  }

  getDependencyName(): string {
    return this.dependency.getName();
  }

  observableWithErrorsNotCaught$(callFails = false): Observable<string> {
    return this.dependency.getObservable$(callFails);
  }

  observableWithErrorsCaught$(callFails = false): Observable<string> {
    return this.dependency.getObservable$(callFails)
      .pipe(
        map( data => data),
        catchError( error => of(error))
      );
  }
}
