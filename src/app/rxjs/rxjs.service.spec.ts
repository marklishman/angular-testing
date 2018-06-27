import { RxjsService } from './rxjsService';
import { Dependency } from './dependency';

describe('RxjsService', () => {

  let service;
  let dependency;

  beforeEach(() => {
    dependency = new Dependency();
    service = new RxjsService(dependency);
  });

  it('observable should be successful', () => {
    service.getObservable$().subscribe(
      (data) => expect(data).toBe('success'),
      () => fail('error not expected')
    );
  });


  it('observable should fail', () => {
    service.getObservable$(true).subscribe(
      () => fail('error expected'),
      (error) => expect(error).toBe('failed')
    );
  });

});
