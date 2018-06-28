import { defer, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class RxjsService {

  observableWithErrorsNotHandled$(): Observable<string> {
    return this.observable$();
  }

  observableWithErrorsHandled$(): Observable<string> {
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
