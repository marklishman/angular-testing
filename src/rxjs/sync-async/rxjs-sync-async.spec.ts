import { RxjsSyncAsync } from './rxjs-sync-async';

describe('RxjsSyncAsync', () => {

  let rxjsSyncAsync;

  beforeEach(() => {
    rxjsSyncAsync = new RxjsSyncAsync();
  });

  it('should return a synchronous observable', () => {
    let result = null;
    rxjsSyncAsync.synchronousObservable$()
      .subscribe(
      (data) => result = data
    );
    expect(result).toBe('ok');
  });

  it('should return an asynchronous observable', () => {
    let result = null;
    rxjsSyncAsync.asynchronousObservable$()
      .subscribe(
        (data) => result = data
      );
    expect(result).toBeNull();

  });

});
