import { defer, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/*

  rxjs-errors

  Examples of raising and catching errors with RxJS

 */


export class RxjsErrors {

  main(): void {
    this.observableWithErrorsNotCaught$()
      .subscribe(
        (data) => console.log('data:', data),
        (error) => console.log('error:', error)
      );

    this.observableWithErrorsCaught$()
      .subscribe(
        (data) => console.log('data or error:', data)
      );
  }

  observableWithErrorsNotCaught$(): Observable<string> {
    return this.observable$();
  }

  observableWithErrorsCaught$(): Observable<string> {
    return this.observable$()
      .pipe(
        catchError( error => of(error))
      );
  }

  private observable$(): Observable<string> {
    return Math.floor(Math.random() * 4) ?
      of('ok') :
      throwError('failed');
  }
}
