import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Signature } from 'src/app/model/signature.model';

@Component({
  selector: 'app-sig-view',
  templateUrl: './sig-view.component.html',
  styleUrls: ['./sig-view.component.scss'],
})
export class SigViewComponent implements OnInit , OnChanges{

  @Input() signatures: [Signature];
  @Input() sigStatus: string;

  @Input() focusOnSignature: boolean;
  

  @ViewChild('sigCards', { static: true }) sigCards: ElementRef;
  
  focusCount = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

    console.log("focusOnSignatur before=", this.focusOnSignature);

    // don't keep focusing here. keep a count and stop focussing if focusHere keeps changing
    if (this.focusOnSignature
      // && this.focusCount < 2
      && this.sigCards && this.sigCards.nativeElement) {
      console.log("setting focus on sigCards");
      this.sigCards.nativeElement.focus();
      this.focusCount++;
    }
  }

  ngOnInit() {}

}
