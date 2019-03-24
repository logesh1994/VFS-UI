import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, AbstractControl, ValidatorFn, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { FeedbackService } from '../services/feedback.service';
import { HttpService } from '../services/http-service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-feedback-rpa',
  templateUrl: '../templates/feedback-rpa.component.html',
  styleUrls: ['../styles/feedback-rpa.component.css'],
})
export class FeedbackRpaComponent implements OnInit {

  feedback_rpa_form = new FormGroup({
    employee_id: new FormControl('', [Validators.required, this.employeeIdValidator, this.customPatternValid]),
    rating: new FormControl('', [Validators.required]),
    liked_things: new FormControl(),
    improvements: new FormControl()
  }, {
      validators: this.rpa_form_validator
    }
  );

  dataUrl: string = "http://localhost:8083/vfs/api/v1/feedback/saveFeedback";
  postRequestData: Object = {};

  rating_options: string[] = ['Very Poor', 'Poor', 'Neutral', 'Good', 'Very Good'];
  low_rating_Options: string[];
  displayMessage: string;
  errorObject: any = {};
  errorMatcher = new RPAErrorStateMatcher();

  constructor(private feedbackService: FeedbackService, private httpService: HttpService, private router: Router, private loadingService: LoadingService) { }

  ngOnInit() {
    this.feedback_rpa_form.controls.rating.disable();
    this.feedback_rpa_form.controls.employee_id.disable();
    this.feedback_rpa_form.controls.employee_id.setValue(this.feedbackService.employee_id);
    this.displayMessage = this.feedbackService.display_message;
  }

  onClick(selectedRating: string) {
    this.feedback_rpa_form.controls.rating.setValue(this.rating_options[selectedRating]);
    this.feedback_rpa_form.controls.rating.setErrors(null);
    this.rpa_form_validator(this.feedback_rpa_form);
  }

  submitFeedback() {
    if (this.feedback_rpa_form.controls.rating.value == null || this.feedback_rpa_form.controls.rating.value == "") {
      this.feedback_rpa_form.controls.rating.setErrors({ missingRating: true });
    }
    if (this.feedback_rpa_form.controls.employee_id.value == null || this.feedback_rpa_form.controls.employee_id.value == "") {
      this.feedback_rpa_form.controls.employee_id.setErrors({ required: true });
    }
    if (this.feedback_rpa_form) {
      console.log("Is feedback Form valid : " + this.feedback_rpa_form.valid)

      this.postRequestData['Event Detail Id'] = this.feedbackService.event_detail_id;
      this.postRequestData['Updated By'] = this.feedbackService.employee_id;
      this.postRequestData['Rating'] = this.feedback_rpa_form.controls.rating.value;
      this.postRequestData['Positives'] = this.feedback_rpa_form.controls.liked_things.value;
      this.postRequestData['Suggested Improvements'] = this.feedback_rpa_form.controls.improvements.value;
      console.log(this.postRequestData);
      this.httpService.postData(this.dataUrl, JSON.stringify(this.postRequestData)).subscribe(responseData => {
        this.loadingService.show("Submitting Feedback ...");
        setTimeout(() => { this.loadingService.hide(); }, 1000);
        console.log(responseData);
        if (responseData && responseData.status_code == 200) {
          this.loadingService.setSuccessMessage(responseData.result['Display Message']);
          this.router.navigate(['/success']);
        }
      }, error => {
        console.log(error);
        this.loadingService.setErrorMessage("Error saving your Feedback !!!");
        this.router.navigate(['/error']);
      });
    }
  }

  resetRPAForm() {
    this.feedback_rpa_form.reset();
    for (let i in this.feedback_rpa_form.controls) {
      console.log(this.feedback_rpa_form.controls[i].value);
      this.feedback_rpa_form.controls[i].setErrors(null);
    }
    this.feedback_rpa_form.controls.employee_id.setValue(this.feedbackService.employee_id);
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

  rpa_form_validator(form: FormGroup) {
    if (['Very Poor', 'Poor', 'Neutral'].includes(form.get('rating').value)) {
      if (form.get('improvements').value == "" || form.get('improvements').value == null) {
        form.get('improvements').setErrors({ missingComments: true });
        return { missingComments: true };
      }
    } else {
      form.get('improvements').setErrors(null);
      return null;
    }
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class RPAErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}