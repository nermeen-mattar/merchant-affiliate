import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../../auth/services/auth.service';
import { UserService } from './../../../core/services/user.service';

@Component({
  selector: 'tc-switch-to-admin',
  templateUrl: './switch-to-admin.component.html',
  styleUrls: ['./switch-to-admin.component.scss']
})
export class SwitchToAdminComponent implements OnInit {
  displaySpinner = false;
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
  }

 /**
  * @author Nermeen Mattar
  * @description switching a logged in user from member to admin
  * @param {ClientSideLoginInfo} loginFormValue
  */
 switchToAdmin(password: string) {
  this.displaySpinner = true;
  this.authService.switchToAdmin({
    username: this.userService.username,
    password: password
  }).subscribe(res => {
  }, err => {
    this.displaySpinner = false;
  });
}
}
