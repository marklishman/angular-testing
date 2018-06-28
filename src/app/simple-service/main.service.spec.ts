import { fakeAsync, inject, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import createSpyObj = jasmine.createSpyObj;

import { MainService } from './main.service';
import { DependencyService } from './dependency.service';

/*

  angular-service-testing

  Examples of testing an angular service with dependencies.

  ---
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

  it('#name should return the real service name', () => {
    expect(mainService.getName()).toBe('the main service');
  });

  it('#dependencyName should return the real dependency name', () => {
    expect(mainService.getDependencyName()).toBe('the dependency service');
  });

  it('#dependencyName should return a mock value when a mock is used', () => {
    const mock = {
      getName: () => 'mock value',
    } as DependencyService;
    mainService = new MainService(mock);
    expect(mainService.getDependencyName()).toBe('mock value');
  });

  it('#dependencyName should return a spy value when a spy method is used (using spyOn)', () => {
    spyOn(dependencyService, 'getName').and.returnValue('spy value');
    expect(mainService.getDependencyName()).toBe('spy value');
  });

  it('#dependencyName should return a spy value when a spy object is used (using createSpyObj)', () => {
    const spy = createSpyObj('dependencyService', ['getName']);
    spy.getName.and.returnValue('spy value');
    mainService = new MainService(spy);
    expect(mainService.getDependencyName()).toBe('spy value');
  });

  it('#observable should return the dependency name in upper case', () => {
    mainService.observable$()
      .subscribe(
        name => expect(name).toBe('THE DEPENDENCY SERVICE'),
        () => fail('error not expected')
      );
  });

  it('#observable$ should return a mock value when a mock object is used', () => {
    const mock = {
      getUpperCaseName$: () => of('mock value'),
    } as DependencyService;
    mainService = new MainService(mock);
    mainService.observable$()
      .subscribe(
        name => expect(name).toBe('mock value'),
        () => fail('error not expected')
      );
  });

  it('#observable$ should return a spy value when a spy object is used', () => {
    const spy = createSpyObj('dependency', ['getUpperCaseName$']);
    spy.getUpperCaseName$.and.returnValue(of('spy ok'));
    mainService = new MainService(spy);
    mainService.observable$().subscribe(
      (data) => expect(data).toBe('spy ok'),
      () => fail('error not expected')
    );
  });

  it('#observable$ should return an error when a spy method is used to throw an error', () => {
    spyOn<any>(dependencyService, 'getUpperCaseName$').and.returnValue(throwError('failed'));
    mainService.observable$().subscribe(
      () => fail('error expected'),
      (error) => expect(error).toBe('failed')
    );
  });

  it('should return the value immediately with a synchronous observable', () => {
    const spy = createSpyObj('dependency', ['getUpperCaseName$']);
    spy.getUpperCaseName$.and.returnValue(of('sync spy value'));
    mainService = new MainService(spy);
    let result = null;
    mainService.observable$().subscribe(
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
    mainService.observable$().subscribe(
      (data) => {
        expect(data).toBe('THE DEPENDENCY SERVICE');
        result = data;
      },
      () => fail('error not expected')
    );
    expect(result).toBeNull();
  });

  it('should wait until asynchronous activities have finished with fakeAsync and tick', fakeAsync(() => {
    let result = null;
    mainService.observable$().subscribe(
      (data) => {
        expect(data).toBe('THE DEPENDENCY SERVICE');
        result = data;
      },
      () => fail('error not expected')
    );
    tick();
    expect(result).toBe('THE DEPENDENCY SERVICE');
  }));
});
