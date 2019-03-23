import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-feedback-ur',
  templateUrl: '../templates/feedback-ur.component.html',
  styleUrls: ['../styles/feedback-ur.component.css']
})
export class FeedbackUrComponent implements OnInit {
  
  feedback_ur_form = new FormGroup ({
    employee_id : new FormControl('', [Validators.required, this.employeeIdValidator, this.customPatternValid]),
    reason : new FormControl('',[Validators.required]),
    comments : new FormControl()
  });

  event_name: string = "Urban Farming Outreach - FeedBack";
  reason_list: string[] = [
    'Unexpected Family commitment',
    'Unexpected official work',
    'Event was not what I expected',
    'Didnot recieve further information about event',
    'Incorrectly registered',
    'Donot wish to disclose'
  ];
  constructor() { }

  ngOnInit() {

  }

  submitFeedback() {
    console.log(this.feedback_ur_form.controls.reason.value);
    if (this.feedback_ur_form.controls.employee_id.value == null || this.feedback_ur_form.controls.employee_id.value == "") {
      this.feedback_ur_form.controls.employee_id.setErrors({ required: true });
    }
    if (this.feedback_ur_form.controls.reason.value == null || this.feedback_ur_form.controls.reason.value == "") {
      this.feedback_ur_form.controls.reason.setErrors({ required: true });
    } 
  }

  resetForm() {
    this.feedback_ur_form.reset();
    for (let i in this.feedback_ur_form.controls) {
      this.feedback_ur_form.controls[i].setErrors(null);
    }
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