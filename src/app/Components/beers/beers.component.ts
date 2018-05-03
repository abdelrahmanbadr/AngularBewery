import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../Services/beer.service';
import { BreweryService } from '../../Services/brewery.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {

  randomBeer;
  breweryBeers;
  constructor(private beerService: BeerService,private breweryService: BreweryService) {
    this.initializeRandomBeers();
//this.getBreweryBeers()
   }

  ngOnInit() {
  }

  initializeRandomBeers()
  {
    if (localStorage.getItem("randomBeers") === null) {
      this.getRandomBeers();
    }else{
      this.randomBeer = JSON.parse(localStorage.getItem('randomBeers'));
      console.log(this.randomBeer);
    }
  }

  getRandomBeers() {
    this.beerService.getRandomBeers().then(response=>{

      this.randomBeer = response;
      localStorage.setItem('randomBeers',JSON.stringify(response));
      //this.messages = response;
    }, (err) => {
      console.log(err);
    });

  }

  getBreweryBeers() {
    let id = "6hzBLo"
    this.breweryService.getBreweryBeers(id).then(response=>{
    this.breweryBeers = response;
      //this.messages = response;
    }, (err) => {
      console.log(err);
    });

  }



}
