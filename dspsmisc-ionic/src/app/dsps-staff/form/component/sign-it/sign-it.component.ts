import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { ModalController } from '@ionic/angular';
import { SigCreateComponent } from '../sig-create/sig-create.component';
import { AuthData } from 'src/app/auth/auth-data.model';


@Component({
  selector: 'app-sign-it',
  templateUrl: './sign-it.component.html',
  styleUrls: ['./sign-it.component.scss'],
})
export class SignItComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;
  @Input() studentUser: AuthData;

  @Output()
  signed: EventEmitter<{ errMsg: string; successMsg: string; focusOnSignature: boolean; }>
    = new EventEmitter<{ errMsg: string; successMsg: string; focusOnSignature: boolean; }>();

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }
  
  openSignItModal() {

    console.log("before opening modal");
    this.modalCtrl.create({
      component: SigCreateComponent,
      componentProps: {
        signer: this.studentUser,
        formBeingSigned : this.wrappedForm
      }
    })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss(); // this is a promise
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirmed') {

          let errMsg: string = null;
          let successMsg: string = null;
          let focusOnSignature = false;

          if (resultData.data.err) {
            errMsg = resultData.data.err;
          } else {
            successMsg = resultData.data.message;
            console.log("this.wrappedForm=", this.wrappedForm);
            if (!this.wrappedForm.signatures) {
              this.wrappedForm['signatures'] = [resultData.data.signature];
            } else {
              this.wrappedForm.signatures.push(resultData.data.signature);
            }

            this.wrappedForm.studentSigStatus = 'signed';

            focusOnSignature = true;

          }

          // output event
          this.signed.emit(
            {
              errMsg: errMsg,
              successMsg: successMsg,
              focusOnSignature: focusOnSignature
            });
          
        }
      }).catch(err => {
        console.log(err);
      });

  }

}
