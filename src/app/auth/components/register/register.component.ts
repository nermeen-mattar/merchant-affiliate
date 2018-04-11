import { AdminService } from './../../../core/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import { HttpRequestsService } from '../../../core/services/http-requests.service';
import { AuthService } from '../../services/auth.service';
import { AdminRegisterInfo } from './../../models/admin-register-info.model';
import { TeamRegisterInfo } from './../../models/team-register-info.model';

@Component({
  selector: 'tc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private adminService: AdminService) {}

  ngOnInit() {}
  selectedStepChanged(changeInfo: StepperSelectionEvent) {
    if (changeInfo.previouslySelectedIndex === 0) {
      this.checkIfAdminAlreadyExist(changeInfo.previouslySelectedStep.stepControl.value);
    }
  }

  checkIfAdminAlreadyExist(firstStepValue) { // add typing
    this.adminService.isAdminExist(firstStepValue.email).subscribe(
    (res: {message: string}) => {
      console.log(res);
      if (res.message === 'not admin yet') {
        console.log('user exist but not admin')
      }
    }, err => { // received an empty errorFields
         console.log(err.error);
      if (err.error.data.message === 'is already admin' || err.status === 'Conflict') {
          console.log('adminAlreadyExist')
      } else if(err.error.data.message === "user doesn't exists" || err.status === "Not Found") {
          console.log('no such user at all  ')
      }
    });
  }

/**
 * @author Nermeen Mattar
 * @description registering a new user, once registration is successful the new user will get logged in using credentials received from the
 * server
 * @param {TeamRegisterInfo} teamInfo
 * @param {AdminRegisterInfo} adminInfo
 */
register(teamInfo: TeamRegisterInfo, adminInfo: AdminRegisterInfo) {
    this.authService.register({
      teamname: teamInfo.teamName,
      teampassword: teamInfo.teamPassword,
      email: teamInfo.email,
      firstname: adminInfo.firstName,
      lastname: adminInfo.lastName,
      adminpassword: adminInfo.adminPassword
    }).subscribe((res) => {
      this.authService.login({
        username: teamInfo.email,
        password: adminInfo.adminPassword
      });
    });
  }
}
