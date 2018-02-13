import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from '../../core/services/http-requests.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'tc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private httpRequestService: HttpRequestsService, private authService: AuthService) { }

  ngOnInit() {
  }

  // TODO[nermeen]: use a method level comment here. Use the AuthService to make the http request.
  // TODO[nermeen]: See the wrong indentation below. Please ifx it and make sure we have one property per line in objects
  register(formValue) {
    this.httpRequestService.httpPost('register', {
      teamname: formValue.teamName,
        teampassword: formValue.teamPassword, email: formValue.email,
         firstname: formValue.firstName, lastname: formValue.lastName,
         adminpassword: formValue.adminPassword
    }).subscribe((res) => {
      this.authService.login({username: formValue.email, password: formValue.adminPassword});
    });
  }

}
