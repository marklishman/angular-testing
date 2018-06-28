import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DependencyService {

  getName(): string {
    return 'the dependency service';
  }

  getName$(): Observable<string> {
    return of(this.getName());
  }
}
