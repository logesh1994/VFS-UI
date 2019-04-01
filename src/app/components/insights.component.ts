import { Component, OnInit } from '@angular/core';
import { ChartDefinition, ChartDefData, ChartDefDataSet } from '../models/ChartDefinition';
import { HttpService } from '../services/http-service';
import { FormGroup, FormControl, Validators, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, ErrorStateMatcher } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-insights',
  templateUrl: '../templates/insights.component.html',
  styleUrls: ['../styles/insights.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class InsightsComponent implements OnInit {

  today = new Date();
  chartDefArray: ChartDefinition[] = [];
  // dataUrl: string = "assets/test-data/insights-response-1.json";
  dataUrl: string = "http://172.18.2.50:10201/vfs/admin/getInsights";
  postRequestData: Object = {};

  insights_form = new FormGroup({
    insight_level: new FormControl('', [Validators.required]),
    from_date: new FormControl('', [Validators.required]),
    to_date: new FormControl('', [Validators.required]),
    event_data: new FormControl()
  });

  insight_list: string[] = [
    "Events",
    "Project"
  ];

  userData = {};
  constructor(private httpService: HttpService, private loadingService: LoadingService, private router: Router) { }

  ngOnInit() {
    this.userData = JSON.parse(sessionStorage.getItem("userData"));
  }

  getDynamicColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ", 0.5)";
  }

  getChartData(responseData: any) {
    var chart;
    responseData.forEach(data => {
      chart = new ChartDefinition();
      chart.type = "bar";
      chart.options = {
        responsive: true,
        maintainAspectRatio: false,
        scaleShowValues: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: false
            }
          }]
        }
      }
      chart.name = data.chartType;
      chart.data = new ChartDefData();
      chart.data['labels'] = data.labels;
      console.log(chart.data['labels']);
      chart.data['datasets'] = [];
      data.datasets.forEach(dataset => {
        var tmpdata = new ChartDefDataSet();
        tmpdata['label'] = dataset.label;
        tmpdata['data'] = dataset.data;
        tmpdata['backgroundColor'] = [];
        var color = this.getDynamicColor();
        data.labels.forEach(element => {
          tmpdata['backgroundColor'].push(color);
        });
        chart.data.datasets.push(tmpdata);
      });
      this.chartDefArray.push(chart);
    });
  }

  submit() {
    console.log("Insights request submitted ...");
    this.chartDefArray = [];
    if (this.insights_form.controls.insight_level.value
      && this.insights_form.controls.from_date.value && this.insights_form.controls.to_date.value
      && this.insights_form.controls.to_date.value >= this.insights_form.controls.from_date.value) {
      this.postRequestData['Insights Level'] = this.insights_form.controls.insight_level.value;
      this.postRequestData['From Date'] = this.insights_form.controls.from_date.value.format("YYYY-MM-DD");
      this.postRequestData['To Date'] = this.insights_form.controls.to_date.value.format("YYYY-MM-DD");
      this.postRequestData['Employee Id'] = this.userData['Employee Id'];
      console.log("Insight Request: " + this.postRequestData);
      this.loadingService.show("Retrieving Insight data ...");
      this.httpService.postData(this.dataUrl, JSON.stringify(this.postRequestData)).subscribe(responseData => {
        console.log(responseData);
        if (responseData && responseData.status_code == 200) {
          this.getChartData(responseData.result.chartData);
        } else if(responseData && responseData.status_code == 400){
          this.loadingService.setErrorMessage("Error in retrieving Insights data, Please try again later !!!");
          this.router.navigate(['/error']);
        }
        this.loadingService.hide();
      }, error => {
        console.log(error);
        this.loadingService.hide();
        this.loadingService.setErrorMessage("Insight Service is down, Please try again later !!!");
        this.router.navigate(['/error']);
      });
    } else {
      for (let i in this.insights_form.controls) {
        if (this.insights_form.controls[i].value == null) {
          this.insights_form.controls[i].setErrors({ required: true });
        }
      }
      if (!(this.insights_form.controls.to_date.value >= this.insights_form.controls.from_date.value)) {
        this.insights_form.controls.to_date.setErrors({ lessThanFromDate: true });
      }
    }
  }
  resetForm() {
    this.insights_form.reset();
    this.chartDefArray = [];
    for (let i in this.insights_form.controls) {
      this.insights_form.controls[i].setErrors(null);
    }
  }
  // customValidator(control: AbstractControl): { [key: string]: any } | null {
  //   if (control.value == null) {
  //     return { 'missing': true };
  //   }
  // }
}

