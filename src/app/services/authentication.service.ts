import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Subject, Observable } from 'rxjs';
import { UserData } from '../models/UserData';
import { AppConstantsService } from './app-constants.service';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userData = new Subject<UserData>();
  dataUrl: string = "http://172.18.2.50:10201/vfs/login/authenticate";

  postRequestData: any ={};
  error = {};

  constructor(private httpService: HttpService, private appConstants: AppConstantsService, private router: Router, private loadingService: LoadingService) { }

  authenticate(userName: string, pswd: string) {
    this.loadingService.show("Contacting Authentication Service ...");
    this.postRequestData['Employee Id'] = userName;
    this.postRequestData['Password'] = pswd;
    this.httpService.postData(this.dataUrl, JSON.stringify(this.postRequestData)).subscribe(responseData => {
      console.log(responseData);
        this.userData.next(responseData);
        this.loadingService.hide();
        console.log("Recieved Authentication response ...");
    }, error => {
      this.loadingService.setErrorMessage("Error in Login Service, please try again after some time ...");
      this.loadingService.hide();
      this.router.navigate(['/error']);
      console.log(error);
    });
  }

  getUserData(): Observable<any> {
    return this.userData.asObservable();
  }

  validUser(role: string[]) {
    var userData: any = JSON.parse(sessionStorage.getItem("userData"));
    if (userData && userData.isValidUser && role.includes(userData.Role)) {
      console.log(userData.isValidUser);
      return userData.isValidUser;
    } else {
      this.router.navigate(['signin']);
      return false;
    }
  }

}
