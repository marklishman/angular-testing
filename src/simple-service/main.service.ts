import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DependencyService } from './dependency.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private dependency: DependencyService) { }

  getName(): string {
    return 'the main service';
  }

  getDependencyName(): string {
    return this.dependency.getName();
  }

  observable$(): Observable<string> {
    return this.dependency.getUpperCaseName$();
  }
}
