import { Component, OnInit } from '@angular/core';
import { ApiService } from './../Services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public allusers: any = [];
  public allvehicles: any = [];
  public allplanets: any = [];
  public selectedPlanets: any = [];
  public vehicles: any = [];
  public count: any = [];
  public page = 0;
  public counter = 1;
  public dataCount = 1;
  public vehecalsPilots: any = [];
  public  SelectedVehecal: any = [];
    constructor(public api: ApiService) {}

    ngOnInit() {

     this.getPeople(1);
    }
    getPeople(count) {
      this.counter = count;
        this.api.GetData('https://swapi.dev/api/people/?page=' + this.counter).then(
          (data1: any) => {
            const allUsersPages = Math.ceil(data1.count / 10) ;
            this.allusers = this.allusers.concat(data1.results);
            if (allUsersPages > this.counter) {
              this.getPeople(++ this.counter);
             } else {
              this.getVehicles(1);
             }
          },
          error => {
            console.log(' Error in recieving data');
          }
        );
    }

    getVehicles(count) {
       let page = count;
        this.api.GetData('https://swapi.dev/api/vehicles/?page=' + page).then(
          (data2: any) => {
            const allVehiclesPages = Math.ceil(data2.count / 10) ;
            this.allvehicles = this.allvehicles.concat(data2.results);
           if (allVehiclesPages > page) {
            this.getVehicles(++page);
           } else {
            this.getPlanets(1);
           }
          },
          error => {
            console.log(' Error in recieving data');
          }
        );
    }
    getPlanets(count) {
      let page = count;
       this.api.GetData('https://swapi.dev/api/planets/?page=' + page).then(
         (data2: any) => {
           const allPlanetsPages = Math.ceil(data2.count / 10) ;
           this.allplanets = this.allplanets.concat(data2.results);
          if (allPlanetsPages > page) {
           this.getPlanets(++page);
          } else {
           this.selectedPlanets = this.allplanets.filter(planet => this.planetsFilter(planet.name));
           this.filterData();
          }
         },
         error => {
           console.log(' Error in recieving data');
         }
       );
   }
   planetsFilter(n) {
     const list = ['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor'];
        return list.includes(n);
   }
    filterData() {
                for (let i = 0 ; this.allvehicles.length > i; i ++) {
                  this.allvehicles[i].pilots = this.allusers.filter(x => x.vehicles.includes(this.allvehicles[i].url));
                }
                this.vehecalsPilots = this.allvehicles.filter(x => x.pilots.length > 0);
                this.vehecalsPilots.forEach(vehecal => {
                  vehecal.homeworld = [];
                  vehecal.homeworld = [];
                  vehecal.pilots.forEach(pilot => {
                    vehecal.homeworld = vehecal.homeworld.concat(this.allplanets.filter(x => x.url === pilot.homeworld));
                  });
                  vehecal.homeworld.forEach(homeworld => {
                    homeworld.population === 'unknown' ? homeworld.population = 0 : homeworld.population = homeworld.population;
                  });
                  vehecal.population = 0;
                  vehecal.population = vehecal.homeworld.length > 1 ? vehecal.homeworld.reduce(function(previousValue, currentValue) {
                    return   Number(previousValue.population) +  Number(currentValue.population);
                  }) : Number(vehecal.homeworld[0].population);

                });
               // this.vehecalsPilots.sort((a, b) => parseFloat(a.population) - parseFloat(b.population));
               this.SelectedVehecal = this.vehecalsPilots.reduce((a, b) => a.population >  b.population ? a : b);
    }
}
