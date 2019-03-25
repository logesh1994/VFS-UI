import { Component, OnInit } from '@angular/core';
import { ExcelUploadDialogComponent } from './excel-upload-dialog.component';
import { MatDialog, MatDialogRef, MatTabChangeEvent, MatSnackBar } from '@angular/material';
import { AdminTableData } from '../models/AdminTableData';
import { CommonSnackBarComponent } from './common-snack-bar.component';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-upload-data',
  templateUrl: '../templates/upload-data.component.html',
  styleUrls: ['../styles/upload-data.component.css']
})
export class UploadDataComponent implements OnInit {

  uploadDataDialogRef: MatDialogRef<ExcelUploadDialogComponent>;
  TABLE_DATA: AdminTableData[] = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private loadingService: LoadingService) { }

  ngOnInit() {}

  openUploadDialog() {
    this.uploadDataDialogRef = this.dialog.open(ExcelUploadDialogComponent);
    this.uploadDataDialogRef.afterClosed().pipe()
      .subscribe(data => {
        this.loadingService.show("Loading Uploaded Data ...");
        setTimeout(() => {this.loadingService.hide();},2000);
        if (data) {
        this.TABLE_DATA.push(data as AdminTableData);
        }
      });
  }

  openSnackBar(event: MatTabChangeEvent) {
    this.snackBar.openFromComponent(CommonSnackBarComponent, {
      duration: 1000, data: {
        displayMessage: "Uploaded data for " + event.tab.textLabel
      }
    });
  }
}
