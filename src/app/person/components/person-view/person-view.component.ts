import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Observable } from 'rxjs';
import { Person } from '../../../model/Person';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {

  person$: Observable<Person>;

  constructor(private personService: PersonService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    const personId = +this.route.snapshot.paramMap.get('personId');
    this.person$ = this.personService.getPerson$(personId);
  }

}
