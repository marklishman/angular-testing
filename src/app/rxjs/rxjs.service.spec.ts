import { RxjsService } from './rxjsService';
import { Dependency } from './dependency';

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

});
