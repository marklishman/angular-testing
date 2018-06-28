import { defer, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class RxjsService {

  observableWithErrorsNotCaught$(): Observable<string> {
    return this.observable$();
  }

  observableWithErrorsCaught$(): Observable<string> {
    return this.observable$()
      .pipe(
        map( data => data),
        catchError( error => of(error))
      );
  }

  private observable$(): Observable<string> {
    return defer(() => Promise.resolve('ok'));
  }
}
