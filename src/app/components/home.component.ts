import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpService } from '../services/http-service';
import { ExcelUploadDialogComponent } from './excel-upload-dialog.component';
import { ChartDefinition } from '../models/ChartDefinition';
import { LoadingService } from '../services/loading.service';
import { UserData } from '../models/UserData';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: '../templates/home.component.html',
  styleUrls: ['../styles/home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private httpService: HttpService, private loadingService: LoadingService
    , private authService: AuthenticationService, private router: Router) {

  }

  event_data_lookup_url: string = "http://172.18.2.50:10201/vfs/admin/getEventDataList";
  trigger_Email_batch_url: string = "http://172.18.2.50:10201/vfs/admin/triggerEmailBatch/";

  event_data_form = new FormGroup({
    event_id: new FormControl('', [Validators.required]),
    location: new FormControl(),
    month: new FormControl(),
    event_name: new FormControl(),
    participated_count: new FormControl(),
    unregistered_count: new FormControl(),
    failed_to_attend_count: new FormControl(),
    submitted_rating: new FormControl(),
    yet_to_send_mail_count: new FormControl(),
    mail_sent_count: new FormControl()
  });
  event_list: string[] = [];
  location_list: string[] = [];
  month_list: string[] = [];
  eventData: any;
  status_Message: string;
  error_Message: string;

  ngOnInit() {
    if (this.authService.validUser(['Admin', 'POC'])) {
      this.loadingService.show('Loading Home Page ...');
      this.httpService.getData(this.event_data_lookup_url).subscribe(responseData => {
        console.log(responseData);
        if (responseData.status_code == 200) {
          this.eventData = responseData.result;
          this.setData();
          this.loadingService.hide();
        } else if (responseData && responseData.status_code == 400) {
          this.loadingService.setErrorMessage("Error in retrieving Event data, Please try again later !!!");
          this.router.navigate(['/error']);
          this.loadingService.hide();
        }
      }, error => {
        console.log(error);
        this.loadingService.setErrorMessage('Service is down, please try again later ...');
        this.router.navigate(['/error']);
        this.loadingService.hide();
      });
      this.event_data_form.controls.event_name.disable();
      this.event_data_form.controls.participated_count.disable();
      this.event_data_form.controls.unregistered_count.disable();
      this.event_data_form.controls.failed_to_attend_count.disable();
      this.event_data_form.controls.submitted_rating.disable();
      this.event_data_form.controls.yet_to_send_mail_count.disable();
      this.event_data_form.controls.mail_sent_count.disable();
    }
  }

  onEventSelect() {
    this.status_Message = null;
    this.error_Message = null;
    console.log(this.event_data_form.controls.event_id.value);
    this.eventData.forEach(element => {
      if (element['Event Id'] == this.event_data_form.controls.event_id.value) {
        this.event_data_form.controls.event_name.setValue(element['Event Name']);
        this.event_data_form.controls.participated_count.setValue(element['Participation Count']);
        this.event_data_form.controls.unregistered_count.setValue(element['Unregistered Count']);
        this.event_data_form.controls.failed_to_attend_count.setValue(element['Failed To attend Count']);
        this.event_data_form.controls.submitted_rating.setValue(element['Submitted Rating Count']);
        this.event_data_form.controls.yet_to_send_mail_count.setValue(element['Yet to Send Mail Count']);
        this.event_data_form.controls.mail_sent_count.setValue(element['Mail Sent Count']);
      }
    });
  }

  onLocationSelect() {
    this.event_list = [];
    this.month_list = [];
    this.eventData.forEach(element => {
      if (element['Location'] == this.event_data_form.controls.location.value) {
        this.event_list.push(element['Event Id']);
        if (!this.month_list.includes(element['Month'])) {
          this.month_list.push(element['Month']);
        }
      }
    });

  }

  resetForm() {
    this.event_data_form.reset();
    this.setData();
    this.event_data_form.controls.event_id.setErrors(null);
    this.status_Message = null;
    this.error_Message = null;
  }

  setData() {
    this.event_list = [];
    this.month_list = [];
    this.location_list = [];
    this.eventData.forEach(data => {
      this.event_list.push(data['Event Id']);
      if (!this.month_list.includes(data['Month'])) {
        this.month_list.push(data['Month']);
      }
      if (!this.location_list.includes(data['Location'])) {
        this.location_list.push(data['Location']);
      }
    });
  }
  triggerEmailBatch() {
    if (this.event_data_form.controls.event_id.value != null) {
      var url = this.trigger_Email_batch_url + this.event_data_form.controls.event_id.value + "/" + "false";
      this.triggerbatch(url);
    } else {
      this.event_data_form.controls.event_id.setErrors({ required: true });
    }
  }

  triggerReminderEmailBatch() {
    if (this.event_data_form.controls.event_id.value != null) {
      var url = this.trigger_Email_batch_url + this.event_data_form.controls.event_id.value + "/" + "true";
      this.triggerbatch(url);
    } else {
      this.event_data_form.controls.event_id.setErrors({ required: true });
    }
  }

  triggerbatch(url) {
    this.status_Message = null;
    this.error_Message = null;
    console.log("Email Batch Triggered");
    this.loadingService.show('Triggering Email Batch...');
    this.httpService.getData(url).subscribe(responseData => {
      console.log(responseData);
      if (responseData.status_code == 200) {
        console.log(responseData.result);
        this.status_Message = "Email Batch Triggered Successfully";
        this.loadingService.hide();
      } else if(responseData.status_code == 400) {
        this.error_Message = "Error triggering the batch, please try again later...";
        this.loadingService.hide();
      }
    }, error => {
      this.error_Message = "Error triggering the batch, please try again later...";
      this.loadingService.hide();
      console.log(error);
    });

  }

}
