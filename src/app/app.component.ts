import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  constructor(private cookieService:CookieService, private router:Router){}

  title = 'J3SMusic';
  checkCookie(){
    var route = this.router.url;
    if(route==="/login" || route==="/signin" || route==="/signup"){
      return true;
    }
    else if(this.cookieService.check("UserID")){
      return true;
    } 
    this.router.navigate(['/login']);
    return false;
  }

  logout(){
    this.cookieService.delete("UserID");
  }

}
