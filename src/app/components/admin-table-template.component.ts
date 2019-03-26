import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import { AdminTableDialogComponent } from './admin.table.dialog';
import { ExcelService } from '../services/excel.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ExcelUploadDialogComponent } from './excel-upload-dialog.component';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'admin-template-table',
  templateUrl: '../templates/admin-table-template.component.html',
  styleUrls: ['../styles/admin-table-template.component.css']
})
export class AdminTableTemplateComponent implements AfterViewInit {

  constructor(public dialog: MatDialog, public excelService: ExcelService, 
    private loadingService: LoadingService) {
     
     }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) dataSource;
  @ViewChild(MatSort) sort: MatSort;
  selection: any;

  @Input() tableName: string;
  @Input() displayedColumns: string[];
  @Input() baseDataSource: any[];

  @Output() onUploadedData = new EventEmitter<boolean>();

  displayedColumnsWithActions: string[];
  action: string;

  filteredDataSource: any[] = [];
  filter_form: FormGroup;
  stickyColumn: string = "id";

  filterObj = {};

  uploadDataDialogRef: MatDialogRef<ExcelUploadDialogComponent>;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
    this.filteredDataSource = Object.assign([], this.dataSource.filteredData);
    this.dataSource = new MatTableDataSource(this.filteredDataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.pageIndex = 0
  }

  ngOnInit() {
    this.dataSourceInit();
    this.displayedColumnsWithActions = Object.assign([], this.displayedColumns);
    this.displayedColumnsWithActions.push("actions");

    //creating the form dynamically and subscribing to the changes
    const formDataObj = {};
    for (var i = 0; i < this.displayedColumns.length; i++) {
      formDataObj[this.displayedColumns[i]] = new FormControl();
    }
    this.filter_form = new FormGroup(formDataObj);
  }

  eventCheck(event: KeyboardEvent, column) {
    // We could change it the flow by using Suscription of the form changes
    if (event.key == "Backspace") {
      this.dataSourceInit();
    }
    this.displayedColumns.forEach(column => {
      var filterValue = this.filter_form.controls[column].value;
      this.filterObj = {};
      console.log(filterValue);
      if (filterValue != null && filterValue != "") {
        console.log(this.dataSource.filteredData);
        this.filterObj['key'] = column;
        this.filterObj['value'] = filterValue;
        console.log(this.filterObj);
        this.dataSource.filterPredicate = (data, filter) => {
          if (data[this.filterObj['key']] && this.filterObj['key']) {
            return String(data[this.filterObj['key']]).toLowerCase().includes(String(this.filterObj['value'].toLowerCase()));
          }
          return false;
        }
        this.applyFilter(filterValue);
      }
    });
  }

  // on sort click the page index gets reset and goes to page 1
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.dataSource.paginator = this.paginator;
  }

  openActionsDialog(rowData: any, action: string, length: number): void {
    const dialogRef = this.dialog.open(AdminTableDialogComponent, {
      data: { tableName: this.tableName, displayedColumns: this.displayedColumns, action: action, rowData: rowData, length: length }
    });
  }

  onEditClick(element) {
    this.action = "edit";
    console.log("Clicked on Edit !!!");
    console.log(element);
    this.openActionsDialog(element, "edit", this.dataSource.data.length);
  }

  onAddClick(element) {
    this.action = "add";
    console.log("Clicked on Add !!!");
    // console.log(element);
    this.openActionsDialog(null, "add", this.dataSource.data.length);
  }

  onDeleteClick(element) {
    this.action = "delete";
    console.log("Clicked on Delete !!!");
    // console.log(element);
    this.openActionsDialog(element, "delete", this.dataSource.data.length);
  }

  isSticky(column) {
    console.log(column);
    console.log(column.includes("Id"));
    return column === "id" || column === "actions" || column.includes("Id");
  }

  exportData() {
    this.excelService.exportExcelData(this.baseDataSource, this.tableName, this.tableName);
  }

  dataSourceInit() {
    this.dataSource = new MatTableDataSource(this.baseDataSource);
    this.paginator.pageIndex = 0;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  exportTemplateData() {
    this.excelService.exportExcelTemplate(this.displayedColumns.slice(1), this.tableName, this.tableName);
  }

  openUploadDialog() {
    this.uploadDataDialogRef = this.dialog.open(ExcelUploadDialogComponent);
    this.uploadDataDialogRef.afterClosed().pipe()
      .subscribe(data => {
        this.loadingService.show("Loading Uploaded Data ...");
        setTimeout(() => {
          this.loadingService.hide();
          this.onUploadedData.emit(true);
        }, 5000);
        // if (data) {
        // this.TABLE_DATA.push(data as AdminTableData);
        // }
      });
    // this.uploadDataDialogRef.componentInstance.onSuccessfullUpload.subscribe(data => {
    //   this.loadingService.show("Loading Uploaded Data ...");
    //   if(data) {
    //   this.onUploadedData.emit(true);
    //   }
    //   setTimeout(() => {
    //     this.loadingService.hide();
    //   },2000);
    //   // if (data) {
    //   // this.TABLE_DATA.push(data as AdminTableData);
    //   // }
    // });
  }
}
