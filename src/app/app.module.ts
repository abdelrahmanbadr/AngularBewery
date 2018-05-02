import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BeerService } from './Services/beer.service';
import { BreweryService } from './Services/brewery.service';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { BeersComponent } from './beers/beers.component';


@NgModule({
  declarations: [
    AppComponent,
    BeersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [BreweryService,BeerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
