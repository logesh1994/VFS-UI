import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../services/http-service';

@Component({
  selector: 'app-postman',
  templateUrl: '../templates/postman.component.html',
  styleUrls: ['../styles/postman.component.css']
})
export class PostmanComponent implements OnInit {

  service_check_form = new FormGroup({
    request_type: new FormControl(),
    url: new FormControl(),
    request: new FormControl(),
    response: new FormControl()
  });

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.service_check_form.controls.response.disable();
  }

  checkService() {
    const req_type = this.service_check_form.value.request_type;
    const url = this.service_check_form.value.url;
    const request_data = this.service_check_form.value.request;
    var response_var;
    if (req_type === "Get" && url) {
      this.httpService.getData(url).subscribe(responseData => {
        response_var = JSON.stringify(responseData.data, undefined, 2)
        this.service_check_form.controls.response.setValue(response_var);
      },  error => {response_var = error;
        this.service_check_form.controls.response.setValue(response_var);});
    } else if (req_type === "Post" && url) {
      this.httpService.postData(url, request_data).subscribe(responseData => {
        console.log(responseData);
        console.log(JSON.stringify(responseData));
        response_var = JSON.stringify(responseData, undefined, 2)
        this.service_check_form.controls.response.setValue(response_var);
      },  error => {response_var = error;
        this.service_check_form.controls.response.setValue(response_var);});
    }
  }

  resetForm() {
    this.service_check_form.reset();
  }

}
