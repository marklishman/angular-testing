import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './main/app.component';
import { PersonListComponent } from './person/containers/person-list/person-list.component';
import { PersonService } from './person/services/person.service';
import { PersonViewComponent } from './person/components/person-view/person-view.component';
import { PersonEditComponent } from './person/components/person-edit/person-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonViewComponent,
    PersonEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
