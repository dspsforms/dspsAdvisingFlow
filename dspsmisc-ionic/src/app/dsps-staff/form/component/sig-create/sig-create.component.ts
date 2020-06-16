import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';
import { FormsService } from '../../forms.service';
import { Signature } from 'src/app/model/signature.model';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { SignatureStatus } from 'src/app/model/sig-status.model';
import { ModalController } from '@ionic/angular';

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

  // prevent multiple submits
  signatureSubmitted = false;

  constructor(
    public formService: FormsService,
    public modalCtrl: ModalController) { 

    this.sigForm = new FormGroup({

      signature: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      
    });
  }


  ngOnInit() { }

  ionViewWillEnter() {
    this.signatureSubmitted = false;
  }
  
 
  signIt() {

    if (!this.sigForm.valid || !this.signer || !this.formBeingSigned) {
      return;
    }

     // ngOnSubmit and onEnterKeyDown() can cause multiple submits. 
    if (this.signatureSubmitted) {
      return;
    }

    this.signatureSubmitted = true;
    
    const now = new Date();
    const signature = new Signature({
      formName: this.formBeingSigned.formName,
      formId: this.formBeingSigned._id,
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

         // dismiss modal
        if (res.err) {
          console.log(res.err);
          this.modalCtrl.dismiss({ err: res.err}, 'confirmed');
        } else {
            // signature saved successfully
          console.log(res.message);
          this.modalCtrl.dismiss({message: res.message, signature: res.signature}, 'confirmed');
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
