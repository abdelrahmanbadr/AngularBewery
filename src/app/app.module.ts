import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BeerService } from './Services/beer.service';
import { BreweryService } from './Services/brewery.service';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


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
    RouterModule.forRoot(appRoutes),
  ],
  providers: [BreweryService,BeerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
