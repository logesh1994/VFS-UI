import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: '../templates/loading.component.html'
})
export class LoadingComponent implements OnInit {

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.show("Loading page ...");
    setTimeout(() => { this.loadingService.hide(); }, 2000);
  }

}
