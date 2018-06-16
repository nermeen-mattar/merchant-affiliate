import { Component, OnInit } from '@angular/core';

import { RegisterService } from './../../services/register.service';
import { AuthService } from '../../services/auth.service';
import { ClientSideLoginInfo } from '../../models/client-side-login-info.model';

@Component({
  selector: 'tc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  displaySpinner = false;
  displayMessage: string;
  enteredEmail: string;
  constructor(private authService: AuthService, private registerService: RegisterService) {}

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description attempts to resend the activation mail.
   */
  resendConfirmationEmail() {
    this.displaySpinner = true;
    this.registerService.resendActivationMail(this.enteredEmail).subscribe(res => {
      this.displaySpinner = false;
    }, err => {
      this.displaySpinner = false;
    });
  }

  /**
   * @author Nermeen Mattar
   * @description attempts to login. In case of using a non-confirmed email a message will be displayed indicating that the user have to
   * confirm the email first. A link to resend the mail confirmation link will also be displayed. In case of using an not existing email
   * a message will be displayed indicating that the user does not exist along with a ling to navigate to the register page.
   * @param {ClientSideLoginInfo} loginFormValue
   */
  login(loginFormValue: ClientSideLoginInfo) {
    this.displaySpinner = true;
    this.displayMessage = null;
    this.enteredEmail = loginFormValue.userEmail;
    this.authService.login({
      username: loginFormValue.userEmail,
      password: loginFormValue.userPassword
    }).subscribe(res => {
      if (res.statusCode) { // temp until the backend fixes the case of email not confirmed by returning an error
        this.displaySpinner = false;
      }
    }, err => {
      this.displaySpinner = false;
     /* Commented until we confirm if we want to give more information (security wise)
     if (err.error.message === 'error.mail.not.confirmed') {
        this.displayMessage = 'mailNotActivated';
      } else if (err.error.message === 'error.mail.not.exist') {
        this.displayMessage = 'mailNotExist';
      }*/
    });
  }
}
