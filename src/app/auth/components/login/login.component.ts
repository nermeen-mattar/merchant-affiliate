import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { ClientSideLoginInfo } from '../../models/client-side-login-info.model';

@Component({
  selector: 'tc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  displaySpinner = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

 /**
  * @author Nermeen Mattar
  * @description logging in for an existing user
  * @param {ClientSideLoginInfo} loginFormValue
  */
 login(loginFormValue: ClientSideLoginInfo) {
   this.displaySpinner = true;
    this.authService.login({
      username: loginFormValue.userEmail,
      password: loginFormValue.userPassword
    }).subscribe(res => {
    }, err => {
      this.displaySpinner = false;
    });
  }
}
 