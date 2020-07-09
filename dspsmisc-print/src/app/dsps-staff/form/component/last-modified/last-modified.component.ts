import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-last-modified',
  templateUrl: './last-modified.component.html',
  styleUrls: ['./last-modified.component.scss']
})
export class LastModifiedComponent implements OnInit {

  @Input() lastModified;
  @Input() lastModifiedBy;
  @Input() currentVersion;

  constructor() { }


  ngOnInit() {
  }

}
