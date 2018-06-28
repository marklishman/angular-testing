import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/*

  rxjs-errors

  Examples of raising and catching errors with RxJS in TypeScript.

  We have two examples of calling a method which returns an observable.
  The first method does not handle any errors and the the second one does.
  [highlight observableWithErrorsNotCaught$ and observableWithErrorsCaught$]

  When we call the two different methods several times we get these results.
  [highlight withErrorCallback and withoutErrorCallback]

  [Show console output]
 */


export class RxjsErrors {

  withErrorCallback(): void {
    this.observableWithErrorsNotCaught$()
      .subscribe(
        (data) => console.log('data:', data),
        (error) => console.log('error:', error)
      );
  }

  withoutErrorCallback(): void {
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
