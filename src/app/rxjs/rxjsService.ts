import { Dependency } from './dependency';
import { Observable } from 'rxjs';

export class RxjsService {

  constructor(private dependency: Dependency) { }

  getObservable$(callFails = false): Observable<string> {
    return this.dependency.getObservable$(callFails);
  }

}
