import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { HttpService } from '../services/http-service';
import { AdminTablePostData } from '../models/AdminTablePostData';

@Component({
  selector: 'app-admin-table-dialog',
  templateUrl: '../templates/admin-table-dialog.component.html',
  styleUrls: ['../styles/admin-table-dialog.component.css']
})
export class AdminTableDialogComponent implements OnInit {

  @Input() tableName: String;
  @Input() displayedColumns: string[];
  @Input() action: string;
  @Input() rowData: any;
  @Input() dataSize: number;

  columnNames: any[];
  data_form: FormGroup;
  dialogTitle: string;
  dialogDescription: string;
  confirmbuttonName: string;
  postData: AdminTablePostData;
  post_response: any;

  dataUrl: string = "http://172.18.1.115:8082/vfs/api/v1/admin/updateAdminData";

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AdminTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService) {
    this.tableName = data.tableName;
    this.displayedColumns = data.displayedColumns;
    this.action = data.action;
    this.rowData = data.rowData;
    this.dataSize = data.length;
  }
  ngOnInit() {
    const formDataObj = {};
    for (var i = 0; i < this.displayedColumns.length; i++) {
      formDataObj[this.displayedColumns[i]] = new FormControl();
      switch (this.action) {
        case 'add': {
          console.log(this.dataSize);
          this.dialogTitle = "Add New Row";
          this.dialogDescription = "Please enter valid values";
          this.confirmbuttonName = "Add";
          if (this.displayedColumns[i].endsWith("Id")) {
            formDataObj[this.displayedColumns[i]].value = this.dataSize + 1;
            formDataObj[this.displayedColumns[i]].disable();
          }
          break;
        }
        case 'edit': {
          this.dialogTitle = "Edit Data"
          this.dialogDescription = "Please edit by giving valid values";
          this.confirmbuttonName = "Edit";
          formDataObj[this.displayedColumns[i]].value = this.rowData[this.displayedColumns[i]];
          if (this.displayedColumns[i].endsWith("Id")) {
            formDataObj[this.displayedColumns[i]].disable();
          }
          break;
        }
        case 'delete': {
          this.dialogTitle = "Delete Data"
          this.dialogDescription = "Please confirm if you would like to delete this data";
          this.confirmbuttonName = "Delete";
          formDataObj[this.displayedColumns[i]].value = this.rowData[this.displayedColumns[i]];
          formDataObj[this.displayedColumns[i]].disable();
          break;
        }
        default: {
          console.log("switch case default");
          break;
        }

      }
    }
    this.data_form = new FormGroup(formDataObj);
    console.log("Ng Init of dialog component");
    console.log(this.action);
    console.log(this.rowData);
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  processEnteredData() {
    console.log(this.data_form);
    switch (this.action) {
      case 'add': {
        this.getPostData("ADD");
        this.httpService.postData(this.dataUrl, JSON.stringify(this.postData)).subscribe(responseData => {
          this.post_response = JSON.stringify(responseData, undefined, 2)
          console.log(this.post_response);
          this.dialogRef.close();
        }, error => {
          console.log(error);
        });
        break;
      }
      case 'edit': {
        this.getPostData("EDIT");
        this.httpService.postData(this.dataUrl, JSON.stringify(this.postData)).subscribe(responseData => {
          this.post_response = JSON.stringify(responseData, undefined, 2)
          console.log(this.post_response);
          this.dialogRef.close();
        }, error => {
          console.log(error);
        });
        break;
      }
      case 'delete': {
        this.getPostData("DELETE");
        this.httpService.postData(this.dataUrl, JSON.stringify(this.postData)).subscribe(responseData => {
          this.post_response = JSON.stringify(responseData, undefined, 2)
          console.log(this.post_response);
          this.dialogRef.close();
        }, error => {
          console.log(error);
        });
        break;
      }
      default: {
        console.log("switch case default");
        break;
      }
        this.dialogRef.close();
    }
  }
  disableSave() {
    if (this.action != 'delete') { return !this.data_form.dirty; }
  }
  getPostData(action: String) {
    this.postData = new AdminTablePostData();
    this.postData.tableName = this.tableName;
    this.postData.data = [{}];
    this.postData.action = action;
    for (let i in this.displayedColumns) {
      this.postData.data[0][this.displayedColumns[i]] = this.data_form.controls[this.displayedColumns[i]].value;
    }
    console.log(this.postData);
  }
}