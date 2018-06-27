import { RxjsService } from './rxjsService';
import { Dependency } from './dependency';
import createSpyObj = jasmine.createSpyObj;
import { of, throwError } from 'rxjs';

describe('RxjsService', () => {

  let service;
  let dependency;

  beforeEach(() => {
    dependency = new Dependency();
    service = new RxjsService(dependency);
  });

  it('observable should succeed', () => {
    service.getFirstObservable$().subscribe(
      (data) => expect(data).toBe('success'),
      () => fail('error not expected')
    );
  });

  it('observable should fail', () => {
    service.getFirstObservable$(true).subscribe(
      () => fail('error expected'),
      (error) => expect(error).toBe('failed')
    );
  });

  it('observable should return success', () => {
    service.getSecondObservable$().subscribe(
      (data) => expect(data).toBe('success'),
      () => fail('error not expected')
    );
  });

  it('observable should return failed', () => {
    service.getSecondObservable$(true).subscribe(
      (data) => expect(data).toBe('failed'),
      () => fail('error not expected')
    );
  });

  it('observable should succeed using spy', () => {
    const spy = createSpyObj('dependency', ['getObservable$']);
    spy.getObservable$.and.returnValue(of('spy success'));
    service = new RxjsService(spy);
    service.getFirstObservable$().subscribe(
      (data) => expect(data).toBe('spy success'),
      () => fail('error not expected')
    );
  });

  it('observable should fail using spy', () => {
    const spy = createSpyObj('dependency', ['getObservable$']);
    spy.getObservable$.and.returnValue(throwError('spy error'));
    service = new RxjsService(spy);
    service.getFirstObservable$().subscribe(
      () => fail('error expected'),
      (error) => expect(error).toBe('spy error')
    );
  });

});
