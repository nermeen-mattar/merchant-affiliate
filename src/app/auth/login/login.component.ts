import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'tc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

 /**
  * @author Nermeen Mattar
  * @description logging in for an existing user
  * @param {ClientSideLoginInfo} loginFormValue
  */
 login(loginFormValue: ClientSideLoginInfo) {
    this.authService.login({
      username: loginFormValue.userEmail,
      password: loginFormValue.userPassword
    });
  }
}
