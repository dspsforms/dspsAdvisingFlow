import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dsps-intro',
  templateUrl: './dsps-intro.page.html',
  styleUrls: ['./dsps-intro.page.scss'],
})
export class DspsIntroPage implements OnInit {

  constructor(public titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("DSPS Home");
  }

}
