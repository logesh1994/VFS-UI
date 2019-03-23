import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-error',
  templateUrl: '../templates/error.component.html'
})
export class ErrorComponent implements OnInit {

  errorMessage: string;
  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.errorMessage = this.loadingService.getErrorMessage();
  }

}
