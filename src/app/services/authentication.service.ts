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

  constructor(private httpService: HttpService, private appConstants: AppConstantsService, private router: Router) { }

  authenticate(userName: string, pswd: string) {
    this.httpService.getData(this.appConstants.SIGN_IN_URL).subscribe(responseData => {
      if (responseData.userData) {
        this.userData.next(responseData.userData[0]);
        console.log("Authentication Successfull ...");
      }
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
