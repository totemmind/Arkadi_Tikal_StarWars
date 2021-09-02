import { Component, OnInit , Input, OnChanges, SimpleChanges} from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() public selectedPlanets: any = [];
  constructor() { }
  ngOnInit() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.stroke();
    const labels = [];
    for (let i = 0; this.selectedPlanets.length > i; i ++) {
      labels.push(this.selectedPlanets[i].name);
    }
    for (let i = 0; i < 5; i++) {
    ctx.fillText(labels[i], 40 + i * 100, 475);
  }
  const maxNum = Number(this.selectedPlanets.reduce((a, b) => a.population >  b.population ? a.population : b.population));
  for (let y = 0; y < this.selectedPlanets.length; y++) {
  const dp = Number(this.selectedPlanets[y].population);
  ctx.fillStyle = '#43558e';
  ctx.fillRect(40 + y * 100, 460 - Math.ceil((dp / maxNum * 100)) * 4 , 50, Math.ceil((dp / maxNum * 100)) * 4);
  ctx.fillStyle = '#a2a2a2';
  ctx.fillText(String(dp) , 40 + y * 100, 445 - Math.ceil((dp / maxNum * 100)) * 4);
    }
  }

}
