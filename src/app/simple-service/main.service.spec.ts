import { inject } from '@angular/core/testing';
import { of } from 'rxjs';

import createSpyObj = jasmine.createSpyObj;

import { MainService } from './main.service';
import { DependencyService } from './dependency.service';

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

  it('#dependencyName$ should be the real name (asynchronous with done)', (done: DoneFn) => {
    mainService.getDependencyName$()
      .subscribe(name => {
          expect(name).toBe('the dependency service');
          done();
        }
      );
  });

  it('#dependencyName should be a mock value', () => {
    const mock = {
      getName: () => 'mock value',
    } as DependencyService;
    mainService = new MainService(mock);
    expect(mainService.getDependencyName()).toBe('mock value');
  });

  it('#dependencyName$ should be a mock value (asynchronous with done)', (done: DoneFn) => {
    const mock = {
      getName$: () => of('mock value'),
    } as DependencyService;
    mainService = new MainService(mock);
    mainService.getDependencyName$()
      .subscribe(name => {
          expect(name).toBe('mock value');
          done();
        }
      );
  });

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

  // TODO TestBed (different spec file)

  // TODO inject??
  it('should be created', inject([MainService], (service: MainService) => {
    expect(service).toBeTruthy();
  }));
});
