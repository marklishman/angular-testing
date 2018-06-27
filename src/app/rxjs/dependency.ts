import { defer, Observable, of, throwError } from 'rxjs';

export class Dependency {

  getObservable$(callFails: boolean): Observable<string> {
    return callFails ?
      throwError('failed') :
      defer(() => Promise.resolve('ok'));
  }
}
