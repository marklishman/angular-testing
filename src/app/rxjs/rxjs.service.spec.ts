import { RxjsService } from './rxjsService';
import { Dependency } from './dependency';
import createSpyObj = jasmine.createSpyObj;
import { defer, of, throwError } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('RxjsService', () => {

  let service;
  let dependency;

  beforeEach(() => {
    dependency = new Dependency();
    service = new RxjsService(dependency);
  });

  it('should return "success" as data if okay', () => {
    service.observableWithErrorsNotCaught$().subscribe(
      (data) => expect(data).toBe('success'),
      () => fail('error not expected')
    );
  });

  it('should return "failed" as an error if the call fails and the error has not been handled', () => {
    service.observableWithErrorsNotCaught$(true).subscribe(
      () => fail('error expected'),
      (error) => expect(error).toBe('failed')
    );
  });

  it('should return "failed" as data if call fails and the error has been handled', () => {
    service.observableWithErrorsCaught$(true).subscribe(
      (data) => expect(data).toBe('failed'),
      () => fail('error not expected')
    );
  });

  it('should return "spy success" as data if okay and using a spy', () => {
    const spy = createSpyObj('dependency', ['getObservable$']);
    spy.getObservable$.and.returnValue(of('spy success'));
    service = new RxjsService(spy);
    service.observableWithErrorsNotCaught$().subscribe(
      (data) => expect(data).toBe('spy success'),
      () => fail('error not expected')
    );
  });

  it('should return "spy error" as an error if the call fails and the error has not been handled', () => {
    const spy = createSpyObj('dependency', ['getObservable$']);
    spy.getObservable$.and.returnValue(throwError('spy error'));
    service = new RxjsService(spy);
    service.observableWithErrorsNotCaught$().subscribe(
      () => fail('error expected'),
      (error) => expect(error).toBe('spy error')
    );
  });

  it('synchronous observable should return the value immediately', () => {
    const spy = createSpyObj('dependency', ['getObservable$']);
    spy.getObservable$.and.returnValue(of('sync spy value'));
    service = new RxjsService(spy);
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

  it('asynchronous observable should not return the value immediately', () => {
    let result = null;
    service.observableWithErrorsNotCaught$().subscribe(
      (data) => {
        expect(data).toBe('success');
        result = data;
      },
      () => fail('error not expected')
    );
    expect(result).toBeNull();
  });

  it('fakeAsync and tick should wait until asynchronous activities have finished', fakeAsync(() => {
    let result = null;
    service.observableWithErrorsNotCaught$().subscribe(
      (data) => {
        expect(data).toBe('success');
        result = data;
      },
      () => fail('error not expected')
    );
    tick();
    expect(result).toBe('success');
  }));

});
