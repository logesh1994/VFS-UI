import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Subject, Observable } from 'rxjs';
import { UserData } from '../models/UserData';
import { AppConstantsService } from './app-constants.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userData = new Subject<UserData>();
  dataUrl: string = "http://localhost:8081/vfs/api/v1/login/authenticate";

  postRequestData: any ={};

  constructor(private httpService: HttpService, private appConstants: AppConstantsService, private router: Router) { }

  authenticate(userName: string, pswd: string) {
    this.postRequestData['Employee Id'] = userName;
    this.postRequestData['Password'] = pswd;
    this.httpService.postData(this.dataUrl, JSON.stringify(this.postRequestData)).subscribe(responseData => {
      console.log(responseData);
        this.userData.next(responseData);
        console.log("Recieved Authentication response ...");
    }, error => {
      console.log(error);
    });
  }

  getUserData(): Observable<any> {
    return this.userData.asObservable();
  }

  validUser(role: string[]) {
    var userData: UserData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData && userData.isValidUser && role.includes(userData.role)) {
      return userData.isValidUser;
    } else {
      this.router.navigate(['signin']);
      return false;
    }
  }

}
