import { Component, OnInit, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import * as XLSX from 'xlsx';
import { AdminTableData } from '../models/AdminTableData';
import { AdminTablePostData } from '../models/AdminTablePostData';
import { HttpService } from '../services/http-service';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingService } from '../services/loading.service';

type AOA = any[][];

@Component({
  selector: 'app-excel-upload-dialog',
  templateUrl: '../templates/excel-upload-dialog.component.html',
  styleUrls: ['../styles/excel-upload-dialog.component.css'],
})
export class ExcelUploadDialogComponent implements OnInit {

  data: AOA;

  uploadedFile: File;
  uploadedFilePath: string;

  sheetname: string;
  displayed_columns: string[];

  adminTable: AdminTableData;

  postData: AdminTablePostData;
  post_response: any;

  //onSuccessfullUpload = new EventEmitter<boolean>();

  dataUrl: string = "http://localhost:8762/vfs/admin/updateAdminData";


  constructor(public dialogRef: MatDialogRef<ExcelUploadDialogComponent>, private httpService: HttpService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.adminTable = new AdminTableData();
  }

  onSubmitClick(): void {
    //this.dialogRef.close(this.adminTable);
    this.getPostData("ADD");
    console.log(this.postData);
    this.httpService.postData(this.dataUrl, JSON.stringify(this.postData)).subscribe(responseData => {
      this.post_response = JSON.stringify(responseData, undefined, 2);
      console.log(this.post_response);
      // if (this.post_response.status_code == 200) {
      //   this.onSuccessfullUpload.emit(true);
      // }
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }

  processFile(event) {
    if (event.target.files[0] !== null) {
      this.uploadedFile = event.target.files[0];
      this.uploadedFilePath = this.uploadedFile.name;
      console.log(this.uploadedFile);
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        const wb1: XLSX.WorkBook = XLSX.read(bstr, { type: 'array' });

        /* grab first sheet */
        this.sheetname = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[this.sheetname];
        console.log(wb.SheetNames);
        /* save data */
        this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        //  this.displayed_columns = this.data[0];
        this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 2 }));
        console.log(this.displayed_columns);
        console.log(this.data);
        // this.adminTable.tableName = this.sheetname;
        // this.adminTable.columnNames = this.displayed_columns;
        // this.adminTable.data = this.data;

        // print the data in console
        // this.displayed_columns = this.data[0];
        // var i: number = 0;
        // var j: number = 0;
        // while (i < this.data.length) {
        //   for (var j: number = 0; j < this.displayed_columns.length; j++) {
        //     console.log(this.data[i][j]);
        //   }
        //   i++;
        // }
      };
      reader.readAsBinaryString(this.uploadedFile);
    }
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, "LOGESH EXCEL.xlsx");
  }
  getPostData(action: String) {
    this.postData = new AdminTablePostData();
    this.postData.tableName = this.sheetname;
    this.postData.data = this.data;
    this.postData.action = action;
    console.log(this.postData);
  }
}
