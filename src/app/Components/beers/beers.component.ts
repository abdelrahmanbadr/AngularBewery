import { Component, OnInit, Input, EventEmitter ,ViewContainerRef } from '@angular/core';


@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {

  breweryBeersEvent;
  constructor() {}

  ngOnInit() {
  }

  setBreweryBeersEvent(event){
    this.breweryBeersEvent = event;
  }





}
