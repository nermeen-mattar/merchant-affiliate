import { AdminService } from './../../../core/services/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import { HttpRequestsService } from '../../../core/services/http-requests.service';
import { AuthService } from '../../services/auth.service';
import { AdminRegisterInfo } from './../../models/admin-register-info.model';
import { TeamRegisterInfo } from './../../models/team-register-info.model';
import { MatHorizontalStepper, MatVerticalStepper } from '@angular/material';
@Component({
  selector: 'tc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // currentStep = 0;
  userType = 'new'; /* possible values: 'admin' 'member' 'new'. Default value is 'new' */
  registerSuccess = false;
  displaySpinner = false;
  constructor(private authService: AuthService, private adminService: AdminService) {}

  ngOnInit() {}
  selectedStepChanged(changeInfo: StepperSelectionEvent) {
    if (changeInfo.previouslySelectedIndex === 0) {
      this.checkUserType(changeInfo.previouslySelectedStep.stepControl.value);
    }
  }

  /**
   * @author Nermeen Mattar
   * @description uses the admin service to check if the admin is already exist. The response has three cases; first, the email might
   * not belong to any user. Second, the email might belong to a user who is not an admin. Third, the email might belong to an admin user.
   * For the first and the third cases the backend returns the result inside an error whereas for the second case the result is inside the
   * response.
   * @param firstStepValue
   */
  checkUserType(firstStepValue: TeamRegisterInfo) { // add typing
    this.displaySpinner = true;
    this.adminService.isAdminExist(firstStepValue.email).subscribe(
      res => { // user exist but not admin
        this.displaySpinner = false;
        this.userType = 'member';
      }, err => {
        this.displaySpinner = false;
        if (err.status === 409 || err.error.statusCode === 409) { // An admin user is already exist
          this.userType = 'admin';

        } else if (err.status === 404 || err.error.statusCode === 404) { // No user Found
          this.userType = 'new';

        }
      });
  }

  /**
   * @author Nermeen Mattar
   * @description registering a new user, once registration is successful the new user will get logged in using credentials received from
   * the server
   * @param {TeamRegisterInfo} teamInfo
   * @param {AdminRegisterInfo} adminInfo
   */
  register(teamInfo: TeamRegisterInfo, adminInfo: AdminRegisterInfo) {
    this.displaySpinner = true;
    const newUserInfo = this.userType !== 'new' ? {} : {
      firstname: adminInfo.firstName,
      lastname: adminInfo.lastName
    };
    this.authService.register({
      ...newUserInfo,
      teamname: teamInfo.teamName,
      teampassword: teamInfo.teamPassword,
      email: teamInfo.email,
      adminpassword: adminInfo.adminPassword
    }).subscribe(res => {
      this.registerSuccess = true;
      if (this.userType !== 'new' ) {
        this.authService.login({
          username: teamInfo.email,
          password: adminInfo.adminPassword
        });
      } else {
        this.displaySpinner = false;
      }
    });
  }
}
