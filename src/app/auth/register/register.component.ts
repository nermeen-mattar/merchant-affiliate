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

  register(formValue) {
    this.httpRequestService.httpPost('register', formValue).subscribe((res) => {
      this.authService.login({username: formValue.email, password: formValue.adminpassword});
    });
  }

}
