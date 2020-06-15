import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';
import { FormsService } from '../../forms.service';
import { Signature } from 'src/app/model/signature.model';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { SignatureStatus } from 'src/app/model/sig-status.model';

@Component({
  selector: 'app-sig-create',
  templateUrl: './sig-create.component.html',
  styleUrls: ['./sig-create.component.scss'],
})
export class SigCreateComponent implements OnInit, OnDestroy {

  sigForm: FormGroup;

  /*
  from AuthData, use 
    email, name, id

  */
  @Input() signer: AuthData; // signer is a student

  @Input() formBeingSigned: WrappedForm;

  sigSaveStatusSub: Subscription;

  signatureStatus: SignatureStatus;

  busy = false;

  constructor(private formService: FormsService) { 

    this.sigForm = new FormGroup({

      signature: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      
    });
  }


  ngOnInit() { }
  
  signIt() {

    if (!this.sigForm.valid || !this.signer || !this.formBeingSigned) {
      return;
    }

    
    const now = new Date();
    const signature = new Signature({
      formName: this.formBeingSigned.formName,
      formId: this.formBeingSigned.formKey,
      formVersion: this.formBeingSigned.currentVersion || null,
      email: this.signer.email,
      collegeId: this.signer.collegeId,
      name: this.signer.name,
      userId: this.signer._id,
      signatureDate: now,
      signature: this.sigForm.get('signature').value,
      lastMod: now

      // server will add ipAddr, loginSeessionId, and _id of the record once saved
      
    });

    // first subscribe
    this.sigSaveStatusSub = this.formService.getSignatureSaveStatusListener().subscribe(
      res => {

        this.busy = false;
        this.signatureStatus = res;
        if (res.err) {
          console.log(res.err);
        } else {
            // signature saved successfully
          console.log(res.message);
        }
      });

    // sign the form
    this.busy = true;
    this.formService.signIt(signature);

  }

  onEnterKeyDown(event) {
    if (!this.sigForm.valid) {
      return;
    }

    this.signIt();

  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.sigSaveStatusSub);
  }

}
