import { Injectable } from '@angular/core';
import { defer, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DependencyService {

  getName(): string {
    return 'the dependency service';
  }

  getObservable$(callFails: boolean): Observable<string> {
    return callFails ?
      throwError('failed') :
      defer(() => Promise.resolve('ok'));
  }
}
