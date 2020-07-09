import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-long-term-ed-goal',
  templateUrl: './long-term-ed-goal.component.html',
  styleUrls: ['./long-term-ed-goal.component.scss'],
})
export class LongTermEdGoalComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;

  labelsLeftCol = {};
  labelsRightCol = {};

  constructor() { }


  ngOnInit() {

    // left col if grid
    this.labelsLeftCol['txferWithoutDeg'] = 'Transfer to 4-yr college w/out Associate Degree';
    this.labelsLeftCol['txferWithDeg'] = 'Transfer to 4-yr college w/Associate Degree';
    this.labelsLeftCol['degVocationalNonTxfer'] = 'Associate Degree, Vocational (non-transfer)';
    this.labelsLeftCol['degGenNonTxfer'] = 'Associate Degree, General Ed. (non-transfer)';
    this.labelsLeftCol['certVocational'] = 'Certificate in Vocational Program';
    this.labelsLeftCol['completeCreditsHighSchoolGed'] = 'Complete credits for High School Diploma or G.E.D.';

    // right col if grid
    this.labelsRightCol['discover'] = 'Discover/Formulate Career Interests, Plans, Goals';
    this.labelsRightCol['improve'] = 'Improve Basic skills in English, Reading, Math';
    this.labelsRightCol['undecided'] = 'Undecided on Educational Goal';
    this.labelsRightCol['acquire'] = 'Acquire Job Skills Only';
    this.labelsRightCol['update'] = 'Update Job Skills Only';
    this.labelsRightCol['maintain'] = 'Maintain Certificate or License';
    this.labelsRightCol['personalDev'] = 'Personal Educational Development';

  }

  get allKeysLeftCol() {
    return Object.keys(this.labelsLeftCol);
  }

  get allKeysRightCol() {
    return Object.keys(this.labelsRightCol);
  }

}
