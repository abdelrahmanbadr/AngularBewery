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
    console.log(this.randomBeer);

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
  pluckBreweryIds()
  {
    var breweriesIds = [];
    if(this.randomBeer.breweries !=null){
      this.randomBeer.breweries.forEach(element => {
        breweriesIds.push(element.id)
      });
    }
    return breweriesIds.join();
  }

  getBreweriesBeers() {
    if (localStorage.getItem("breweriesBeers"+this.randomBeer.id) === null) {
      let breweriesIds = this.pluckBreweryIds();
      this.breweryService.getBreweriesBeers(breweriesIds).then(response=>{
        this.beers = response;
        localStorage.setItem('breweriesBeers'+this.randomBeer.id,JSON.stringify(response));
        //this.messages = response;
      }, (err) => {
        console.log(err);
      });
    }else{
      this.beers = JSON.parse(localStorage.getItem("breweriesBeers"+this.randomBeer.id));
    }
  }

  removeBreweriesBeersStorage() {
    if (this.randomBeer !== null && localStorage.getItem("breweriesBeers"+this.randomBeer.id) !== null) {
      localStorage.removeItem('breweriesBeers'+this.randomBeer.id);
    }
  }

  search() {
    this.beers = [];
    this.searchService.search(this.searchQuery,this.searchType).then(response=>{
      if(response['empty']){
        this.searchError = response['empty'];
      }else{
        this.beers = response;
      }
    }, (err) => {
      if(err['status'] == 422){
        this.searchError = err['error']
      }else{
      console.log(err);
      }
    });
  }



}
