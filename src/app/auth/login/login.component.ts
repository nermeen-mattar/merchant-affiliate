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
  //userEmail.value, userPassword.value
  login(loginFormValue) {
    this.authService.login({username: loginFormValue.userEmail, password: loginFormValue.userPassword});
  }
}
