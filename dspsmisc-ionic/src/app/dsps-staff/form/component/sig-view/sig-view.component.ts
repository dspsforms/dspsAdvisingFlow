import { Component, OnInit, Input } from '@angular/core';
import { Signature } from 'src/app/model/signature.model';

@Component({
  selector: 'app-sig-view',
  templateUrl: './sig-view.component.html',
  styleUrls: ['./sig-view.component.scss'],
})
export class SigViewComponent implements OnInit {

  @Input() signatures: [Signature];
  @Input() sigStatus: string;
  constructor() { }

  ngOnInit() {}

}
