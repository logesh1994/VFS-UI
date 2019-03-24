import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpService } from '../services/http-service';
import { ExcelUploadDialogComponent } from './excel-upload-dialog.component';
import { ChartDefinition } from '../models/ChartDefinition';
import { LoadingService } from '../services/loading.service';
import { UserData } from '../models/UserData';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: '../templates/home.component.html',
  styleUrls: ['../styles/home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private httpService: HttpService, private loadingService: LoadingService
    , private authService: AuthenticationService) {

  }

  event_data_lookup_url: string = "http://localhost:8082/vfs/api/v1/admin/getEventDataList";
  trigger_Email_batch_url: string = "http://localhost:8082/vfs/api/v1/admin/triggerEmailBatch/";

  event_data_form = new FormGroup({
    event_id: new FormControl('', [Validators.required]),
    participated_count: new FormControl(),
    unregistered_count: new FormControl(),
    failed_to_attend_count: new FormControl(),
    submitted_rating: new FormControl(),
    submitted_reason_rfa: new FormControl(),
    submitted_reason_ur: new FormControl()
  });
  event_list: string[] = [];
  eventData: any;

  ngOnInit() {
    this.loadingService.show('Loading Home Page ...');
    this.httpService.getData(this.event_data_lookup_url).subscribe(responseData => {
      console.log(responseData);
      if (responseData.status_code == 200) {
        this.eventData = responseData.result;
        responseData.result.forEach(data => {
          this.event_list.push(data['Event Id']);
          this.loadingService.hide();
        });
      }
    }, error => {
      console.log(error);
    });
    this.event_data_form.controls.participated_count.disable();
    this.event_data_form.controls.unregistered_count.disable();
    this.event_data_form.controls.failed_to_attend_count.disable();
    this.event_data_form.controls.submitted_rating.disable();
    this.event_data_form.controls.submitted_reason_rfa.disable();
    this.event_data_form.controls.submitted_reason_ur.disable();
  }

  onEventSelect() {
    console.log(this.event_data_form.controls.event_id.value);
    this.eventData.forEach(element => {
      if (element['Event Id'] == this.event_data_form.controls.event_id.value) {
    this.event_data_form.controls.participated_count.setValue(element['Participation Count']);
    this.event_data_form.controls.unregistered_count.setValue(element['Unregistered Count']);
    this.event_data_form.controls.failed_to_attend_count.setValue(element['Failed To attend Count']);
    this.event_data_form.controls.submitted_rating.setValue(element['Submitted Rating Count']);
    this.event_data_form.controls.submitted_reason_rfa.setValue(element['Submitted Reason Count(RFA)']);
    this.event_data_form.controls.submitted_reason_ur.setValue(element['Submitted Reason Count(UR)']);
      }
    });
  }

  resetForm() {
    this.event_data_form.reset();
    this.event_data_form.controls.event_id.setErrors(null);
  }

  triggerEmailBatch() {
    if(this.event_data_form.controls.event_id.value != null) {
      console.log("Email Batch Triggered");
      this.loadingService.show('Triggering Email Batch...');
      this.httpService.getData(this.trigger_Email_batch_url+this.event_data_form.controls.event_id.value).subscribe(responseData => {
        console.log(responseData);
        if (responseData.status_code == 200) {
            console.log(responseData.result);
            this.loadingService.hide();
        }
      }, error => {
        console.log(error);
      });
    } else {
      this.event_data_form.controls.event_id.setErrors({ required: true });
    }
  }

}
