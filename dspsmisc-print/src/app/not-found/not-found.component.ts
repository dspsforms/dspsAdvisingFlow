import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  onClick() {
    console.log("from not-found: going to http://localhost:4200/print/view/aap2/5f0403cc87243165a65f6a54");
    this.router.navigateByUrl('/print/view/aap2/5f0403cc87243165a65f6a54');
  }
}
