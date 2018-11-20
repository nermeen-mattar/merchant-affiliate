import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatIconRegistry } from '@angular/material';

// Modules imported at app level
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { createTranslateLoader } from './core/loaders/translate-loader';
import { EmailActivationComponent } from './components/email-activation/email-activation.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MemberActivationFormComponent } from './components/member-activation-form/member-activation-form.component';
import { SDKBrowserModule } from './sdk';

@NgModule({
  declarations: [
    AppComponent,
    EmailActivationComponent,
    MemberActivationFormComponent,
    ResetPasswordComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    MatIconModule,
    SDKBrowserModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [MatIconRegistry],
  bootstrap: [AppComponent],
})
export class AppModule {}
