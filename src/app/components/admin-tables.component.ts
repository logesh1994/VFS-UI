import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { CommonSnackBarComponent } from './common-snack-bar.component';
import { HttpService } from '../services/http-service';
import { AdminTableData } from '../models/AdminTableData';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-admin-tables',
  templateUrl: '../templates/admin-tables.component.html',
  styleUrls: ['../styles/admin-tables.component.css'],
  providers: []
})
export class AdminTablesComponent implements OnInit {

 // dataUrl: string = "assets/test-data/admin-table-data.json";
 //dataUrl: string = "assets/test-data/Actual-Admin-Data-Response.json";
 dataUrl: string = "http://172.18.1.115:8082/vfs/api/v1/admin/getAdminData";
  TABLE_DATA: AdminTableData[] = [];
  adminTable: AdminTableData = new AdminTableData();
  isAdminUser: boolean;

  constructor(private snackBar: MatSnackBar, 
    private loadingService: LoadingService, private httpService: HttpService, 
    private authService: AuthenticationService) { }

  ngOnInit() {
    if (this.authService.validUser(["Admin"])) {
      this.loadingService.show('Loading Admin Table Data ...');
      setTimeout(() => { this.loadingService.hide(); }, 1000);
      this.getTableData();
    }
  }

  openSnackBar(event: MatTabChangeEvent) {
    this.snackBar.openFromComponent(CommonSnackBarComponent, {
      duration: 1500, data: {
        displayMessage: "Selected " + event.tab.textLabel
      },
    });
  }

  getTableData() {
    this.httpService.getData(this.dataUrl).subscribe(responseData => {
      console.log(responseData);
      if (responseData.status_code == 200) {
        responseData.result.forEach(element => {
          this.adminTable = element as AdminTableData;
          this.TABLE_DATA.push(this.adminTable);
        });
      }
    }, error => {
      console.log(error);
    });
  }

  refreshData() {
    console.log("Refreshing Admin Data...");
    window.location.reload();
  }

}
