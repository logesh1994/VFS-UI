import { Component, OnInit } from '@angular/core';
import { AdminTableData } from '../models/AdminTableData';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { HttpService } from '../services/http-service';
import { CommonSnackBarComponent } from './common-snack-bar.component';

@Component({
  selector: 'app-event-data',
  templateUrl: '../templates/event-data.component.html',
  styleUrls: ['../styles/event-data.component.css']
})
export class EventDataComponent implements OnInit {
 // dataUrl: string = "assets/test-data/event-data.json";
 dataUrl: string = "http://localhost:8082/vfs/api/v1/admin/getEventDetailsData";
  TABLE_DATA: AdminTableData[] = [];
  adminTable: AdminTableData = new AdminTableData();

  constructor(private snackBar: MatSnackBar, private httpService: HttpService) { }

  ngOnInit() {
    this.getTableData();
   }

  openSnackBar(event: MatTabChangeEvent) {
    this.snackBar.openFromComponent(CommonSnackBarComponent, {
      duration: 500, data: {
        displayMessage: "Selected " + event.tab.textLabel
      }
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

}
