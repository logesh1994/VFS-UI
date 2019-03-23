import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  excelExtension: string = ".xlsx";
  templateData: any[][];

  constructor() { 
    this.templateData = [];
  }

  exportExcelData(dataSource: any, sheetName: string, fileName: string) {
    /* generate worksheet */
    const ws = XLSX.utils.json_to_sheet(dataSource);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    /* save to file */
    XLSX.writeFile(wb, fileName + this.excelExtension);
  }

  exportExcelTemplate(columnNames: string[], sheetName: string, fileName: string) {
    /* generate worksheet */
    this.templateData[0] = columnNames;
    console.log(this.templateData);
    const ws: XLSX.WorkSheet = [];
    XLSX.utils.sheet_add_aoa(ws, this.templateData);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    /* save to file */
    XLSX.writeFile(wb, fileName + this.excelExtension);
  }
}
