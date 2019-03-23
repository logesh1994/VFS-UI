import { Component, OnInit, ViewChild, Input, AfterViewInit, Output } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';

@Component({
  selector: 'app-insights',
  templateUrl: '../templates/insights-template.component.html',
  styleUrls: ['../styles/insights-template.component.css']
})
export class InsightsTemplateComponent implements OnInit {

  @Input() type: any;
  @Input() data: any;
  @Input() options: any;
  dataUrl: any;
 @ViewChild('chart') chart: ChartComponent;

  constructor() { }

  ngOnInit() {
    this.dataUrl = '';
  }

  onClick() {
    console.log("Dowload Chart button Clicked !!!");
    console.log(this.chart.chart.toBase64Image());
    this.dataUrl = this.chart.chart.toBase64Image();
  }

}
