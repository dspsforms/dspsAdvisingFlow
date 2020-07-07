import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteInfo } from './route-info';

@Component({
  selector: 'app-intermediate',
  templateUrl: './intermediate.page.html',
  styleUrls: ['./intermediate.page.scss'],
})
export class IntermediatePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {

    // get the route from RouteInfo.nextPage
    // set RouteInfo.nextPage to null
    console.log("intermediate: ionViewWillEnter");
    const tmp = RouteInfo.nextPage;
    if (tmp) {
      RouteInfo.nextPage = null;
      this.router.navigateByUrl(tmp);
    } else {
      this.router.navigateByUrl('/landing');
    }
  }

}
