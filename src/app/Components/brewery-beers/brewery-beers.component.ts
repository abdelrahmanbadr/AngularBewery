import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators,NgForm } from '@angular/forms';
import { BreweryService } from '../../Services/brewery.service';
import { SearchService } from '../../Services/search.service';
import { EmitterService } from '../../Services/emitter-service.service';

@Component({
  selector: 'app-brewery-beers',
  templateUrl: './brewery-beers.component.html',
  styleUrls: ['./brewery-beers.component.css']
})
export class BreweryBeersComponent implements OnInit {
  randomBeer;
  beers;
  searchError: string ;
  searchTypeError: boolean;
  @ViewChild('form') searchForm:NgForm;


  constructor(private breweryService: BreweryService,private searchService:SearchService,private emitterService: EmitterService) {
  }

  ngOnInit() {
    this.emitterService.events$.forEach(event =>
      this.getBreweriesBeers(event)
    );
  }

  pluckBreweryIds()
  {
    this.randomBeer = JSON.parse(localStorage.getItem('randomBeer'));
    var breweriesIds = [];
    if(this.randomBeer.breweries !=null){
      this.randomBeer.breweries.forEach(element => {
        breweriesIds.push(element.id)
      });
    }
    return breweriesIds.join();
  }

  getBreweriesBeers(id) {
    if (localStorage.getItem("breweriesBeers"+id) === null) {
      let breweriesIds = this.pluckBreweryIds();
      this.breweryService.getBreweriesBeers(breweriesIds).then(response=>{
        this.beers = response;
        localStorage.setItem('breweriesBeers'+id,JSON.stringify(response));
        //this.messages = response;
      }, (err) => {
        console.log(err);
      });
    }else{
      this.beers = JSON.parse(localStorage.getItem("breweriesBeers"+id));
    }
  }

  search() {
    this.beers = [];
    this.searchService.search(this.searchForm.value.searchQuery,this.searchForm.value.searchType).then(response=>{
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
