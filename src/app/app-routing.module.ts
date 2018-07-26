import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonListComponent } from './person/containers/person-list/person-list.component';
import { PersonViewComponent } from './person/components/person-view/person-view.component';
import { PersonEditComponent } from './person/components/person-edit/person-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/persons', pathMatch: 'full'},
  {path: 'persons/:personId/edit', component: PersonEditComponent},
  {path: 'persons/new', component: PersonEditComponent},
  {path: 'persons/:personId', component: PersonViewComponent},
  {path: 'persons', component: PersonListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
