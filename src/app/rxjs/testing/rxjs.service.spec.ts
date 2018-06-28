import { defer, of, throwError } from 'rxjs';

import { RxjsService } from './rxjs.service';

/*

  testing-observables

  Examples of testing synchronous and asynchronous observables, including error handling.

 */

describe('RxjsService', () => {

  let service;

  beforeEach(() => {
    service = new RxjsService();
  });

  it('should return "ok" as data if successful', () => {
    service.observableWithErrorsNotHandled$().subscribe(
      (data) => expect(data).toBe('ok'),
      () => fail('error not expected')
    );
  });

  it('should return "success" as data when the observable$ method is replaced by a spy', () => {
    spyOn<any>(service, 'observable$').and.returnValue(of('success'));
    service.observableWithErrorsNotHandled$().subscribe(
      (data) => expect(data).toBe('success'),
      () => fail('error not expected')
    );
  });

  it('should return "failed" as data if the error was handled', () => {
    spyOn<any>(service, 'observable$')
      .and.returnValue(
        defer(() => Promise.reject('failed'))
      );
    service.observableWithErrorsHandled$().subscribe(
      (data) => expect(data).toBe('failed'),
      () => fail('error not expected')
    );
  });

  it('should return "failed" as an error if the error is not handled', () => {
    spyOn<any>(service, 'observable$')
      .and.returnValue(
      defer(() => Promise.reject('failed'))
    );
    service.observableWithErrorsNotHandled$().subscribe(
      () => fail('error expected'),
      (error) => expect(error).toBe('failed')
    );
  });

  it('should return the value immediately with a synchronous observable', () => {
    spyOn<any>(service, 'observable$').and.returnValue(of('sync spy value'));
    let result = null;
    service.observableWithErrorsNotHandled$().subscribe(
      (data) => {
        expect(data).toBe('sync spy value');
        result = data;
      },
          () => fail('error not expected')
    );
    expect(result).toBe('sync spy value');
  });

  it('should not return the value immediately with an asynchronous observable', () => {
    let result = null;
    service.observableWithErrorsNotHandled$().subscribe(
      (data) => {
        expect(data).toBe('ok');
        result = data;
      },
      () => fail('error not expected')
    );
    expect(result).toBeNull();
  });

});
