import { defer, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class RxjsService {

  constructor() { }

  observableWithErrorsNotCaught$(callFails = false): Observable<string> {
    return this.observable$(callFails);
  }

  observableWithErrorsCaught$(callFails = false): Observable<string> {
    return this.observable$(callFails)
      .pipe(
        map( data => data),
        catchError( error => of(error))
      );
  }

  private observable$(callFails: boolean): Observable<string> {
    return callFails ?
      throwError('failed') :
      defer(() => Promise.resolve('ok'));
  }
}
