import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../Services/beer.service';
import { BreweryService } from '../../Services/brewery.service';
import { SearchService } from '../../Services/search.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {

  randomBeer;
  beers;
  searchQuery;
  searchType ;
  searchError ;
  constructor(private beerService: BeerService,private breweryService: BreweryService,private searchService:SearchService) {
    this.initializerandomBeer();
//this.getBreweryBeers()
   }

  ngOnInit() {
  }

  initializerandomBeer()
  {
    if (localStorage.getItem("randomBeer") === null) {
      this.getRandomBeer();
    }else{
      this.randomBeer = JSON.parse(localStorage.getItem('randomBeer'));
      console.log(this.randomBeer);
    }
  }

  getRandomBeer() {
    this.removeBreweryBeersStorage();
    this.beerService.getRandomBeer().then(response=>{

      this.randomBeer = response;
      localStorage.setItem('randomBeer',JSON.stringify(response));
      //this.messages = response;
    }, (err) => {
      console.log(err);
    });

  }

  getBreweryBeers(id) {
    if (localStorage.getItem("breweryBeers"+id) === null) {
      this.breweryService.getBreweryBeers(id).then(response=>{
        this.beers = response;
        localStorage.setItem('breweryBeers'+id,JSON.stringify(response));
        //this.messages = response;
      }, (err) => {
        console.log(err);
      });
    }else{
      this.beers = JSON.parse(localStorage.getItem("breweryBeers"+id));
    }
  }

  removeBreweryBeersStorage() {
    if (this.randomBeer !== null && localStorage.getItem("breweryBeers"+this.randomBeer.id) !== null) {
      localStorage.removeItem('breweryBeers'+this.randomBeer.id);
    }
  }

  search() {
    this.beers = [];
    this.searchService.search(this.searchQuery,this.searchType).then(response=>{
      if(response['error']){
        this.searchError = response['error'];
      }else{
        this.beers = response;
      }
    }, (err) => {
      console.log(err);
    });
  }



}
