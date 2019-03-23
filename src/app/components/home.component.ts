import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpService } from '../services/http-service';
import { ExcelUploadDialogComponent } from './excel-upload-dialog.component';
import { ChartDefinition } from '../models/ChartDefinition';
import { LoadingService } from '../services/loading.service';
import { UserData } from '../models/UserData';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: '../templates/home.component.html',
  styleUrls: ['../styles/home.component.css']
})
export class HomeComponent implements OnInit {

  users: Object;
  errorMessage: object;

  //chart data
  type: any;
  data: any;
  options: any;

  chartDefinitions: ChartDefinition[];

  chart1: ChartDefinition = new ChartDefinition();
  chart2: ChartDefinition = new ChartDefinition();
  chart3: ChartDefinition = new ChartDefinition();

  @ViewChild('progressLoader') progressLoader: ElementRef; 

  constructor(private cdr: ChangeDetectorRef, private uploadDialog: MatDialog, 
    private httpService: HttpService, private loadingService: LoadingService, private authService:AuthenticationService) { 
   
  }

  ngOnInit() {
    if(this.authService.validUser(["Admin","Volunteer"])) {
    this.loadingService.show('Loading User Data ...');
    this.users = this.httpService.getData("https://reqres.in/api/users").subscribe(data => {
    this.users = data;
    this.loadingService.hide();
    },
      error => {this.errorMessage = error});
      this.setChartData();
      console.log(this.chart1);
      console.log(this.chart2);
      console.log(this.chart3);
  }
}

  openUploadDialog() {
    const uploadDialogRef = this.uploadDialog.open(ExcelUploadDialogComponent, {
    });
  }

  setChartData() {
    this.chart1.data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        }
      ]
    };
    this.chart2.data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        }
      ]
    };
    this.chart3.data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        }
      ]
    };
    this.chart1.type = 'pie';
    this.chart2.type = 'line';
    this.chart3.type = 'bar';
   this.chart1.options = {
    responsive: true,
    maintainAspectRatio: false
  };
  this.chart2.options = {
    responsive: true,
    maintainAspectRatio: false
  };
  this.chart3.options = {
    responsive: true,
    maintainAspectRatio: false
  };
  }

}
