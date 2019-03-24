import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { LoadingService } from './services/loading.service';
import { AuthenticationService } from './services/authentication.service';
import { UserData } from './models/UserData';
import { Location } from '@angular/common';
import { HttpService } from './services/http-service';
import { FeedbackService } from './services/feedback.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Volunteer Feedback System';

  ADMIN_ROUTES = [
    { navLabel: "Home", route: "/home" },
    { navLabel: "Upload Data", route: "/upload-data" },
    { navLabel: "Feedback RPA", route: "/feedback-RPA" },
    { navLabel: "Feedback RFA", route: "/feedback-RFA" },
    { navLabel: "Feedback UR", route: "/feedback-UR" },
    { navLabel: "Insights", route: "/insights" },
    { navLabel: "Admin Tables", route: "/admin-tables" },
    { navLabel: "Event Data", route: "/event-data" },
    { navLabel: "Post Man", route: "/postman" },
    { navLabel: "Contact", route: "/contact" }
  ]

  VOLUNTEER_ROUTES = [
    { navLabel: "Home", route: "/home" },
    { navLabel: "Feedback RPA", route: "/feedback-RPA" },
    { navLabel: "Feedback RFA", route: "/feedback-RFA" },
    { navLabel: "Feedback UR", route: "/feedback-UR" },
  ]

  FEEDBACK_ROUTES = [ "/feedback-RPA", "/feedback-RFA", "/feedback-UR"];

  @ViewChild('sidenav') sidenav;
  toggleMenu: boolean = true;
  loadingMessage: string;
  userData: UserData = new UserData();
  sideNavRoutes: any;

  currentRoute: string;

  postRequestData: Object = {};

  dataUrl: string =  "http://localhost:8083/vfs/api/v1/feedback/getFeedbackTemplate";

  constructor(private router: Router, 
    private loadingService: LoadingService, 
    private authService: AuthenticationService, private location: Location,
    private httpService: HttpService, private feedbackService: FeedbackService) {
      this.currentRoute = location.path();
     }

  ngOnInit() {
    console.log("App initited !!!");

    this.initiateNavigation();

    this.loadingService.getLoadingMessage().subscribe(message => {
      console.log(message['text']);
      this.loadingMessage = message['text'];
    });

    this.authService.getUserData().subscribe(data => {
      this.userData = data;
      sessionStorage.setItem("userData", JSON.stringify(this.userData));
      console.log("Updating User data ...");
      console.log(sessionStorage.getItem("userData"));
      this.router.navigate(['home']);
      this.initiateNavigation();
    });
  }

  navToggle() {
    this.sidenav.toggle();
    this.toggleMenu = !this.toggleMenu;
  }

  logout() {
    console.log("Logging out ...");
    sessionStorage.clear();
    this.navToggle();
    this.router.navigate(['signin']);
  }

  validUser() {
    var userData: UserData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData && userData.isValidUser) {
      return userData.isValidUser;
    }
  }

  initiateNavigation() {
    if (sessionStorage.getItem("userData")) {
      this.userData = JSON.parse(sessionStorage.getItem("userData"));
      if (this.userData.isValidUser) {
        switch (this.userData.role) {
          case 'Admin': {
            this.sideNavRoutes = this.ADMIN_ROUTES;
            break;
          }
          case 'Volunteer': {
            this.sideNavRoutes = this.VOLUNTEER_ROUTES;
            break;
          }
          default: {
            console.log("switch case default");
            break;
          }
        }
      }
    } else {
      console.log(this.currentRoute);
      if (this.currentRoute.includes("/feedback/")) {
       this.checkFeedbackUrl(); 
      } else {
        this.router.navigate(['/signin']);
      }
    }
  }
  checkFeedbackUrl() {
    this.router.navigate(['/loading']);
        this.postRequestData = {};
        var routeArray = this.currentRoute.split("/");
        let numRegEx: RegExp = /^[0-9]*$/;
        console.log("Length: " + routeArray.length + ",idLength: " + routeArray[2].length + " ,match: " + routeArray[2].match(numRegEx));
        if (routeArray.length == 4 && routeArray[2].length == 6 && 
          routeArray[2].match(numRegEx)) {
            this.postRequestData['EventDetail Id'] = routeArray[3];
            this.postRequestData['Employee Id'] = routeArray[2];
            this.httpService.postData(this.dataUrl, JSON.stringify(this.postRequestData)).subscribe(responseData => {
              console.log(responseData);
              if (responseData && responseData.status_code == 200) {
                this.redirectToFeedbackPage(responseData.result);
              }
            }, error => {
              console.log(error);
              this.loadingService.setErrorMessage("Invalid URL !!!");
              this.router.navigate(['/error']);
            });
          }
  }
  redirectToFeedbackPage(data: any){
    this.feedbackService.employee_id = data['Employee Id'];
    this.feedbackService.display_message = data['Display Message'];
    this.feedbackService.feedback_type = data['Feedback Type'];
    this.feedbackService.feedback_option = data['Feedback Options'];
    this.feedbackService.event_detail_id = data['EventDetail Id'];
    if (data['Feedback Type'] == "RPA") {
      this.router.navigate(['/feedback-RPA']);
    } else if ((data['Feedback Type'] == "RFA")) {
      this.router.navigate(['/feedback-RFA']);
    } else if((data['Feedback Type'] == "Submitted")) {
      this.loadingService.setSuccessMessage(data['Display Message']);
      this.router.navigate(['/success']);
    }
  }
}
