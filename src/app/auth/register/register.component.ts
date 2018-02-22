import { Component, OnInit } from '@angular/core';

import { HttpRequestsService } from '../../core/services/http-requests.service';
import { AuthService } from '../services/auth.service';
import { ClientSideRegisterInfo } from './../models/client-side-register-info.model';

@Component({
  selector: 'tc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {}

/**
 * @author Nermeen Mattar
 * @description registering a new user, once registration is successful the new user will get logged in using credentials received from the
 * server
 * @param {ClientSideRegisterInfo} registerFormValue
 */
register(registerFormValue: ClientSideRegisterInfo) {
    this.authService.register({
      teamname: registerFormValue.teamName,
      teampassword: registerFormValue.teamPassword,
      email: registerFormValue.email,
      firstname: registerFormValue.firstName,
      lastname: registerFormValue.lastName,
      adminpassword: registerFormValue.adminPassword
    }).subscribe((res) => {
      this.authService.login({
        username: registerFormValue.email,
        password: registerFormValue.adminPassword
      });
    });
  }
}
