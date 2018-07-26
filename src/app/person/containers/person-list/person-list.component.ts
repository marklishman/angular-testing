import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../../model/Person';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons$: Observable<Person[]>;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.persons$ = this.personService.getPersons$();
  }

  onDelete(id: number): void {
    console.log('delete');
  }

}
