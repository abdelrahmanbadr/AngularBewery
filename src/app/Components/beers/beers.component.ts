import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../Services/beer.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {

  randomBeers;
  constructor(private beerService: BeerService) {
    this.initializeRandomBeers();
   }

  ngOnInit() {
  }

  getRandomBeers() {
    this.beerService.getRandomBeers().then(response=>{

      this.randomBeers = response;
      localStorage.setItem('randomBeers',JSON.stringify(response));
      //this.messages = response;
    }, (err) => {
      console.log(err);
    });

  }

  initializeRandomBeers()
  {
    if (localStorage.getItem("randomBeers") === null) {
      this.getRandomBeers();
    }else{
      this.randomBeers = localStorage.getItem('randomBeers');
    }
  }

}
