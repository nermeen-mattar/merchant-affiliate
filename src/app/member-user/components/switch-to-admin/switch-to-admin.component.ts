import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../../auth/services/auth.service';
import { UserService } from './../../../core/services/user.service';

@Component({
  selector: 'tc-switch-to-admin',
  templateUrl: './switch-to-admin.component.html',
  styleUrls: ['./switch-to-admin.component.scss']
})
export class SwitchToAdminComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
  }

 /**
  * @author Nermeen Mattar
  * @description logging in for an existing user
  * @param {ClientSideLoginInfo} loginFormValue
  */
 switchToAdmin(password: string) {
  this.authService.switchToAdmin({
    username: this.userService.getUsername(),
    password: password
  });
}
}
