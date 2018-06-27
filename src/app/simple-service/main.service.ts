import { Injectable } from '@angular/core';
import { DependencyService } from './dependency.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private dependencyService: DependencyService) {}

  getName(): string {
    return 'the main service';
  }

  getDependencyName(): string {
    return this.dependencyService.getName();
  }

  getDependencyName$(): Observable<string> {
    return this.dependencyService.getName$();
  }
}
