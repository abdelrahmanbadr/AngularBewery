import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../Services/beer.service';
import { EmitterService } from '../../Services/emitter-service.service';




@Component({
  selector: 'app-random-beer',
  templateUrl: './random-beer.component.html',
  styleUrls: ['./random-beer.component.css']
})
export class RandomBeerComponent implements OnInit {
  randomBeer;


  constructor(private beerService: BeerService,private emitterService: EmitterService) {
    this.initializerandomBeer();
    // console.log(this.randomBeer);
   }

   ngOnInit() {

  }

  initializerandomBeer()
  {
    if (localStorage.getItem("randomBeer") === null) {
      this.getRandomBeer();
    }else{
      this.randomBeer = JSON.parse(localStorage.getItem('randomBeer'));
    }
  }

  getRandomBeer() {
    this.removeBreweriesBeersStorage();
    this.beerService.getRandomBeer().then(response=>{

      this.randomBeer = response;
      localStorage.setItem('randomBeer',JSON.stringify(response));
      //this.messages = response;
    }, (err) => {
      console.log(err);
    });
  }

  showBreweryBeers(id) {
    this.emitterService.breweryBeersEvent(id);
  }

  removeBreweriesBeersStorage() {
    if (this.randomBeer != null && localStorage.getItem("breweriesBeers"+this.randomBeer.id) != null) {
      localStorage.removeItem('breweriesBeers'+this.randomBeer.id);
    }
  }

}
