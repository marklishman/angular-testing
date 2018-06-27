import { Dependency } from './dependency';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class RxjsService {

  constructor(private dependency: Dependency) { }

  getFirstObservable$(callFails = false): Observable<string> {
    return this.dependency.getObservable$(callFails);
  }

  getSecondObservable$(callFails = false): Observable<string> {
    return this.dependency.getObservable$(callFails)
      .pipe(
        map( data => data),
        catchError( error => of(error))
      );
  }

}
