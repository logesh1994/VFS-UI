import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingMessage = new Subject<any>();
  private errorMessage: string;
  private successMessage: string;
  
  constructor(private spinner: NgxSpinnerService) { }

  show(message: string) {
    this.loadingMessage.next({ text: message });
    this.spinner.show();
  }

  hide() {
    this.spinner.hide();
  }

  clearMessage() {
    this.loadingMessage.next();
  }

  getLoadingMessage(): Observable<any> {
    return this.loadingMessage.asObservable();
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  setSuccessMessage(message: string) {
    this.successMessage = message;
  }

  getSuccessMessage() {
    return this.successMessage;
  }
}
