import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-success',
  templateUrl: '../templates/success.component.html'
})
export class SuccessComponent implements OnInit {

  successMessage: string;
  heading: string;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.successMessage = this.loadingService.getSuccessMessage();
    this.heading = "Thank You !!!"
  }

}
