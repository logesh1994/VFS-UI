import { Component, OnInit } from '@angular/core';
import { AdminTableData } from '../models/AdminTableData';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { HttpService } from '../services/http-service';
import { CommonSnackBarComponent } from './common-snack-bar.component';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-event-data',
  templateUrl: '../templates/event-data.component.html',
  styleUrls: ['../styles/event-data.component.css']
})
export class EventDataComponent implements OnInit {
  // dataUrl: string = "assets/test-data/event-data.json";
  dataUrl: string = "http://172.18.2.50:10201/vfs/admin/getEventDetailsData/";
  TABLE_DATA: AdminTableData[] = [];
  adminTable: AdminTableData = new AdminTableData();

  constructor(private snackBar: MatSnackBar, private httpService: HttpService,
     private loadingService: LoadingService, private router: Router, private authenService: AuthenticationService) { }

  ngOnInit() {
    this.loadingService.show("Loading Event & Feedback Data ...");
    this.getTableData(["Admin","POC"]);
  }

  openSnackBar(event: MatTabChangeEvent) {
    this.snackBar.openFromComponent(CommonSnackBarComponent, {
      duration: 500, data: {
        displayMessage: "Selected " + event.tab.textLabel
      }
    });
  }

  getTableData(role: string[]) {
    var userData: any = JSON.parse(sessionStorage.getItem("userData"));
    if (userData && userData.isValidUser && role.includes(userData.Role)) {
      this.httpService.getData(this.dataUrl + userData['Employee Id']).subscribe(responseData => {
        console.log(responseData);
        if (responseData.status_code == 200) {
          responseData.result.forEach(element => {
            this.adminTable = element as AdminTableData;
            this.TABLE_DATA.push(this.adminTable);
          });
          this.loadingService.hide();
        } else if (responseData && responseData.status_code == 400) {
          this.loadingService.setErrorMessage("Error in retrieving Admin data, Please try again later !!!");
          this.router.navigate(['/error']);
          this.loadingService.hide();
        }
      }, error => {
        console.log(error);
        this.loadingService.setErrorMessage("Service is down, Please try again later !!!");
        this.router.navigate(['/error']);
        this.loadingService.hide();
      });
    } else {
      this.router.navigate(['signin']);
    }
  }

}
