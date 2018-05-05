import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BeerService } from './Services/beer.service';
import { BreweryService } from './Services/brewery.service';
import { SearchService } from './Services/search.service';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './components/app/app.component';
import { BeersComponent } from './components/beers/beers.component';

const appRoutes: Routes = [
  { path: '', component: BeersComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    BeersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [BreweryService,BeerService,SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
