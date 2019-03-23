import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-common-snack-bar',
  templateUrl: '../templates/common-snack-bar.component.html',
  styleUrls: ['../styles/common-snack-bar.component.css']
})
export class CommonSnackBarComponent implements OnInit {

  @Input() displayMessage: string;

  constructor(public matSnackbarRef: MatSnackBarRef<CommonSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.displayMessage = data.displayMessage;
  }

  ngOnInit() {}

}
