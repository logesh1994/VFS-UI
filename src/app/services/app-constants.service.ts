import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConstantsService {

  public ADMIN_ROLES: string[] = ["Admin", "Volunteer"];
  
  public ADMIN_USER: string = "Admin";

  public SIGN_IN_URL: string = "assets/test-data/user-data.json";

  constructor() { }
}
