import { of, throwError } from 'rxjs';

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

  it('should return "ok" as data', () => {
    service.observableWithErrorsNotCaught$().subscribe(
      (data) => expect(data).toBe('ok'),
      () => fail('error not expected')
    );
  });

  it('should return "failed" as an error', () => {
    service.observableWithErrorsNotCaught$(true).subscribe(
      () => fail('error expected'),
      (error) => expect(error).toBe('failed')
    );
  });

  it('should return "failed" as data', () => {
    service.observableWithErrorsCaught$(true).subscribe(
      (data) => expect(data).toBe('failed'),
      () => fail('error not expected')
    );
  });

  it('should return "spy ok" as data', () => {
    spyOn<any>(service, 'observable$').and.returnValue(of('spy ok'));
    service.observableWithErrorsNotCaught$().subscribe(
      (data) => expect(data).toBe('spy ok'),
      () => fail('error not expected')
    );
  });

  it('should return "spy error" as an error', () => {
    spyOn<any>(service, 'observable$').and.returnValue(throwError('spy error'));
    service.observableWithErrorsNotCaught$().subscribe(
      () => fail('error expected'),
      (error) => expect(error).toBe('spy error')
    );
  });

  it('should return the value immediately with a synchronous observable', () => {
    spyOn<any>(service, 'observable$').and.returnValue(of('sync spy value'));
    let result = null;
    service.observableWithErrorsNotCaught$().subscribe(
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
    service.observableWithErrorsNotCaught$().subscribe(
      (data) => {
        expect(data).toBe('ok');
        result = data;
      },
      () => fail('error not expected')
    );
    expect(result).toBeNull();
  });

});
