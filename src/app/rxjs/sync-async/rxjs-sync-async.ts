import { defer, Observable, of } from 'rxjs';

/*

  rxjs-sync-async

  A TypeScript example of a synchronous observable using `of`, and an asynchronous observable
   using `defer` and a Promise.


 */


export class RxjsSyncAsync {

  synchronousObservable$(): Observable<string> {
    return of('ok');
  }

  asynchronousObservable$(): Observable<string> {
    return defer(() => Promise.resolve('ok'));
  }

}
