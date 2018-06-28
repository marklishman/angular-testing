import { fakeAsync, inject, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import createSpyObj = jasmine.createSpyObj;

import { MainService } from './main.service';
import { DependencyService } from './dependency.service';

/*

  testing-observables

  Examples of testing synchronous and asynchronous observables, including error handling..



  fakeAsync & tick

  it('should test something', fakeAsync(() => {
      ...
      tick(); // flush the microtasks queue
      fixture.detectChanges();
      // expect
  }));

  The `fakeAsync` function enables a linear coding style by running the test body in a special fakeAsync test zone.

  Calling `tick()` simulates the passage of time until all pending asynchronous activities finish.

  Use custom `asyncData` and `asyncError` functions using `defer(() => Promise.resolve(data))`. See Testing in angular.io for details.

  Preferred.
 */

describe('MainService', () => {

  let mainService: MainService;
  let dependencyService: DependencyService;

  beforeEach(() => {
    dependencyService = new DependencyService();
    mainService = new MainService(dependencyService);
  });

  it('#name should be the real value', () => {
    expect(mainService.getName()).toBe('the main service');
  });

  it('#dependencyName should be the real value (synchronous)', () => {
    expect(mainService.getDependencyName()).toBe('the dependency service');
  });

  // it('#dependencyName$ should be the real name (asynchronous with done)', (done: DoneFn) => {
  //   mainService.getDependencyName$()
  //     .subscribe(name => {
  //         expect(name).toBe('the dependency service');
  //         done();
  //       }
  //     );
  // });

  it('#dependencyName should be a mock value', () => {
    const mock = {
      getName: () => 'mock value',
    } as DependencyService;
    mainService = new MainService(mock);
    expect(mainService.getDependencyName()).toBe('mock value');
  });

  // it('#dependencyName$ should be a mock value (asynchronous with done)', (done: DoneFn) => {
  //   const mock = {
  //     getName$: () => of('mock value'),
  //   } as DependencyService;
  //   mainService = new MainService(mock);
  //   mainService.getDependencyName$()
  //     .subscribe(name => {
  //         expect(name).toBe('mock value');
  //         done();
  //       }
  //     );
  // });

  it('#dependencyName should be a spy value (using spyOn)', () => {
    spyOn(dependencyService, 'getName').and.returnValue('spy value');
    expect(mainService.getDependencyName()).toBe('spy value');
  });

  it('#dependencyName should be a spy value (using createSpyObj)', () => {
    const spy = createSpyObj('dependencyService', ['getName']);
    spy.getName.and.returnValue('spy value');
    mainService = new MainService(spy);
    expect(mainService.getDependencyName()).toBe('spy value');
  });

  it('should return "ok" as data', () => {
    mainService.observableWithErrorsNotCaught$().subscribe(
      (data) => expect(data).toBe('ok'),
      () => fail('error not expected')
    );
  });

  it('should return "failed" as an error', () => {
    mainService.observableWithErrorsNotCaught$(true).subscribe(
      () => fail('error expected'),
      (error) => expect(error).toBe('failed')
    );
  });

  it('should return "failed" as data', () => {
    mainService.observableWithErrorsCaught$(true).subscribe(
      (data) => expect(data).toBe('failed'),
      () => fail('error not expected')
    );
  });

  it('should return "spy ok" as data', () => {
    const spy = createSpyObj('dependency', ['getObservable$']);
    spy.getObservable$.and.returnValue(of('spy ok'));
    mainService = new MainService(spy);
    mainService.observableWithErrorsNotCaught$().subscribe(
      (data) => expect(data).toBe('spy ok'),
      () => fail('error not expected')
    );
  });

  it('should return "spy error" as an error', () => {
    const spy = createSpyObj('dependency', ['getObservable$']);
    spy.getObservable$.and.returnValue(throwError('spy error'));
    mainService = new MainService(spy);
    mainService.observableWithErrorsNotCaught$().subscribe(
      () => fail('error expected'),
      (error) => expect(error).toBe('spy error')
    );
  });

  it('should return the value immediately with a synchronous observable', () => {
    const spy = createSpyObj('dependency', ['getObservable$']);
    spy.getObservable$.and.returnValue(of('sync spy value'));
    mainService = new MainService(spy);
    let result = null;
    mainService.observableWithErrorsNotCaught$().subscribe(
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
    mainService.observableWithErrorsNotCaught$().subscribe(
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
    mainService.observableWithErrorsNotCaught$().subscribe(
      (data) => {
        expect(data).toBe('ok');
        result = data;
      },
      () => fail('error not expected')
    );
    tick();
    expect(result).toBe('ok');
  }));

  // TODO TestBed (different spec file)

  // TODO inject??
  it('should be created', inject([MainService], (service: MainService) => {
    expect(service).toBeTruthy();
  }));
});
