import { Injectable } from '@angular/core';
import { Person } from '../../model/Person';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  getPersons$(): Observable<Person[]> {
    return of([
      new Person(1, 'Bob', 'Smith'),
      new Person(2, 'Sue', 'Jones'),
      new Person(3, 'Roger', 'Walker')
    ]);
  }

  getPerson$(id: number): Observable<Person> {
    return this.getPersons$()
      .pipe(
        map(persons => persons.find(
          person => person.id === id
        )
      )
    );
  }
}
