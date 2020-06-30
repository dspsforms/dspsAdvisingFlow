import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './util/error-interceptor';
import { AuthInterceptor } from './auth/auth-interceptor';
import { SubSiteCommunicatorComponent } from './auth/sub-site-communicator/sub-site-communicator.component';
import { SafePipe } from './util/safe.pipe';
import { ErrorComponent } from './error/error.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SubSiteCommunicatorComponent,
    SafePipe,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    // MatProgressSpinnerModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent ]
})
export class AppModule { }
