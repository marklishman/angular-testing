import { Injectable } from '@angular/core';
import { defer, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DependencyService {

  getName(): string {
    return 'the dependency service';
  }

  getUpperCaseName$(): Observable<string> {
    const upperCaseName = this.getName().toUpperCase();
    return defer(() => Promise.resolve(upperCaseName));
  }
}
