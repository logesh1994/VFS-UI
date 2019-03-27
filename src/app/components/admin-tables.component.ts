import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { CommonSnackBarComponent } from './common-snack-bar.component';
import { HttpService } from '../services/http-service';
import { AdminTableData } from '../models/AdminTableData';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-tables',
  templateUrl: '../templates/admin-tables.component.html',
  styleUrls: ['../styles/admin-tables.component.css'],
  providers: []
})
export class AdminTablesComponent implements OnInit, OnDestroy {

  // dataUrl: string = "assets/test-data/admin-table-data.json";
  //dataUrl: string = "assets/test-data/Actual-Admin-Data-Response.json";
  //dataUrl: string = "http://localhost:8082/vfs/api/v1/admin/getAdminData";
  dataUrl: string = "http://localhost:8762/vfs/admin/getAdminData";
  TABLE_DATA: AdminTableData[] = [];
  adminTable: AdminTableData = new AdminTableData();
  isAdminUser: boolean;
  subscriptions: Subscription[] = [];

  constructor(private snackBar: MatSnackBar,
    private loadingService: LoadingService, private httpService: HttpService,
    private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if (this.authService.validUser(["Admin"])) {
      this.loadingService.show('Loading Admin Table Data ...');
      //   setTimeout(() => { this.loadingService.hide(); }, 1000);
      this.getTableData();
    }
    this.subscriptions.push(this.loadingService.getCurdOperationStatus().subscribe(message => {
      console.log(message['text']);
      if(message['text'] == "Completed") {
        this.TABLE_DATA =[];
        this.ngOnInit();
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  openSnackBar(event: MatTabChangeEvent) {
    if (event.tab) {
      this.snackBar.openFromComponent(CommonSnackBarComponent, {
        duration: 1500, data: {
          displayMessage: "Selected " + event.tab.textLabel
        },
      });
    }   
  }

  getTableData() {
    this.httpService.getData(this.dataUrl).subscribe(responseData => {
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
  }

  refreshData() {
    console.log("Refreshing Admin Data...");
    window.location.reload();
  }

}
