import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: '../templates/signin.component.html',
  styleUrls: ['../styles/signin.component.css']
})
export class SigninComponent implements OnInit {

  hide = true;
  public imagesUrl;
  login_form = new FormGroup ({
    loginId : new FormControl(),
    password : new FormControl() 
  });

  constructor(public router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.imagesUrl = [
      "/assets/5ada441118000028003842c9.jpeg",
      "/assets/184.jpg",
      "/assets/185.jpg",
      "/assets/186.png"
      ];
  }

  validateUser() {
    // if (this.login_form.value.loginId == "admin" && this.login_form.value.password == "admin") {
    //   sessionStorage.isValidSession = 2;
    //   this.router.navigateByUrl('home');
    //   console.log("Succesfully Logged in ...")
    // }
    if(this.login_form.value.loginId && this.login_form.value.password) {
      console.log(this.login_form.value.loginId + "  " + this.login_form.value.password);
      this.authService.authenticate(this.login_form.value.loginId, this.login_form.value.password);
    }
    
  }

}
