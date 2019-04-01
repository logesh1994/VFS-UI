import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { FeedbackService } from '../services/feedback.service';
import { HttpService } from '../services/http-service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-feedback-rfa',
  templateUrl: '../templates/feedback-rfa.component.html',
  styleUrls: ['../styles/feedback-rfa.component.css']
})
export class FeedbackRfaComponent implements OnInit {

  feedback_rfa_form = new FormGroup({
    employee_id: new FormControl('', [Validators.required, this.employeeIdValidator, this.customPatternValid]),
    reason: new FormControl('',[Validators.required]),
    comments: new FormControl()
  });

  displayMessage: string;
  reason_list: string[] = [];

  dataUrl: string = "http://172.18.2.50:10201/vfs/feedback/saveFeedback";
  postRequestData: Object = {};

  constructor(private feedbackService: FeedbackService, private httpService: HttpService, private router: Router, private loadingService: LoadingService) { }

  ngOnInit() {
      this.reason_list = [
        'Unexpected Family commitment',
        'Unexpected official work',
        'Event was not what I expected',
        'Didnot recieve further information about event',
        'Incorrectly registered',
        'Donot wish to disclose'
      ];
      this.feedback_rfa_form.controls.employee_id.setValue("<EMPLOYEE ID>");
      this.displayMessage = "Please share your Feedback for the Outreach event \""
      + "<EVENT NAME>" +"\" that you missed to attend on " + "<EVENT DATE>" + "\"";
     
    this.feedback_rfa_form.controls.employee_id.disable();
    if (this.feedbackService.display_message) {
      this.feedback_rfa_form.controls.employee_id.setValue(this.feedbackService.employee_id);
      this.reason_list = this.feedbackService.feedback_option;
      this.displayMessage = this.feedbackService.display_message;
    }
  }

  submitFeedback() {
    console.log(this.feedback_rfa_form.controls.reason.value);
    if (this.feedback_rfa_form.controls.employee_id.value == null || this.feedback_rfa_form.controls.employee_id.value == "") {
      this.feedback_rfa_form.controls.employee_id.setErrors({ required: true });
    }
    if (this.feedback_rfa_form.controls.reason.value == null || this.feedback_rfa_form.controls.reason.value == "") {
      this.feedback_rfa_form.controls.reason.setErrors({ required: true });
    }
    if (this.feedback_rfa_form.valid) {
      this.postRequestData['Event Detail Id'] = this.feedbackService.event_detail_id;
      this.postRequestData['Updated By'] = this.feedbackService.employee_id;
      this.postRequestData['Reason'] = this.feedback_rfa_form.controls.reason.value;
      this.postRequestData['Suggested Improvements'] = this.feedback_rfa_form.controls.comments.value;
      this.httpService.postData(this.dataUrl, JSON.stringify(this.postRequestData)).subscribe(responseData => {
        this.loadingService.show("Submitting Feedback ...");
        setTimeout(() => { this.loadingService.hide(); }, 1000);
        console.log(responseData);
        if (responseData && responseData.status_code == 200) {
          this.loadingService.setSuccessMessage(responseData.result['Display Message']);
          this.router.navigate(['/success']);
        } else if(responseData && responseData.status_code == 400){
          this.loadingService.setErrorMessage("Error in saving your Feedback, Please try again later !!!");
          this.router.navigate(['/error']);
        }
      }, error => {
        console.log(error);
        this.loadingService.setErrorMessage("Service is down, Please try again later !!!");
        this.router.navigate(['/error']);
      });
    }
  }

  resetForm() {
    this.feedback_rfa_form.reset();
    for (let i in this.feedback_rfa_form.controls) {
      this.feedback_rfa_form.controls[i].setErrors(null);
    }
    this.feedback_rfa_form.controls.employee_id.setValue(this.feedbackService.employee_id);
  }

  employeeIdValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.length != 6) {
      return { 'invalidEmployeeId': true };
    }
  }

  customPatternValid(control: AbstractControl): { [key: string]: any } | null {
    let urlRegEx: RegExp = /^[0-9]*$/;
    if (control.value && !control.value.match(urlRegEx)) {
      return { 'invalidEmployeeId': true };
    }
  };
}

/** Error when invalid control is dirty, touched, or submitted. */
export class RPAErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}