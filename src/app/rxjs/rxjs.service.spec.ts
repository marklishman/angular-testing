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
    const spy = createSpyObj('dependency', ['getObservable$']);
    spy.getObservable$.and.returnValue(of('spy ok'));
    service = new RxjsService(spy);
    service.observableWithErrorsNotCaught$().subscribe(
      (data) => expect(data).toBe('spy ok'),
      () => fail('error not expected')
    );
  });

  it('should return "spy error" as an error', () => {
    const spy = createSpyObj('dependency', ['getObservable$']);
    spy.getObservable$.and.returnValue(throwError('spy error'));
    service = new RxjsService(spy);
    service.observableWithErrorsNotCaught$().subscribe(
      () => fail('error expected'),
      (error) => expect(error).toBe('spy error')
    );
  });

  it('should return the value immediately with a synchronous observable', () => {
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

  it('should wait until asynchronous activities have finished with fakeAsync and tick', fakeAsync(() => {
    let result = null;
    service.observableWithErrorsNotCaught$().subscribe(
      (data) => {
        expect(data).toBe('ok');
        result = data;
      },
      () => fail('error not expected')
    );
    tick();
    expect(result).toBe('ok');
  }));

});
