import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatHorizontalStepper, MatVerticalStepper } from '@angular/material';

import { RegisterService } from './../../services/register.service';
import { FieldValidatorsService } from './../../../core/services/field-validators.service';
import { HttpRequestsService } from '../../../core/services/http-requests.service';
import { AdminService } from './../../../core/services/admin.service';
import { AuthService } from '../../services/auth.service';
import { AdminRegisterInfo } from './../../models/admin-register-info.model';
import { TeamRegisterInfo } from './../../models/team-register-info.model';
import { UserMessagesService } from '../../../core/services/user-messages.service';
@Component({
  selector: 'tc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userType = 'new'; /* possible values: 'admin' 'member' 'new'. Default value is 'new' */
  displaySpinner = false;
  emailActivationRequired = false;
  displayMessageCard = false;
  registerFirstStepForm: FormGroup;
  registerSecondStepForm: FormGroup;
  constructor(private authService: AuthService, private adminService: AdminService,
    private registerService: RegisterService,
    private fieldValidatorsService: FieldValidatorsService, private userMessagesService: UserMessagesService) {}

  ngOnInit() {
    this.createRegisterFirstStepForm();
    this.createRegisterSecondStepForm();
  }
  selectedStepChanged(changeInfo: StepperSelectionEvent) {
    if (changeInfo.previouslySelectedIndex === 0) {
      this.checkUserType(changeInfo.previouslySelectedStep.stepControl.value);
    }
  }
  createRegisterFirstStepForm() {
    this.registerFirstStepForm = new FormGroup({
      teamName: new FormControl('', [Validators.required]),
      teamPassword: new FormControl('', [Validators.required,
        this.fieldValidatorsService.getValidator('validatePassword')
      ]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  createRegisterSecondStepForm() {
    this.registerSecondStepForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      adminPassword: new FormControl('', [Validators.required]),
      adminNewPassword: new FormControl('', [Validators.required, this.fieldValidatorsService.getValidator('validatePassword')]),
      adminConfirmPassword: new FormControl('', [Validators.required])
    }, [this.fieldValidatorsService.getValidator('validateEqual', {
      field1: 'adminNewPassword',
      field2: 'adminConfirmPassword'
    })]);
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
        this.disableFormControls(['firstName', 'lastName', 'adminPassword']);
        this.enableFormControls(['adminNewPassword', 'adminConfirmPassword']);
      }, err => {
        this.displaySpinner = false;
        if (err.status === 409 || err.error.statusCode === 409) { // An admin user is already exist
          this.userType = 'admin';
          this.disableFormControls(['firstName', 'lastName', 'adminConfirmPassword', 'adminNewPassword']);
          this.enableFormControls(['adminPassword']);
        } else if (err.status === 404 || err.error.statusCode === 404) { // No user Found
          this.userType = 'new';
          this.disableFormControls(['adminPassword']);
          this.enableFormControls(['firstName', 'lastName', 'adminNewPassword', 'adminConfirmPassword']);
        }
      });
  }

  /**
   * @author Nermeen Mattar
   * @description disables the form controls with the received names
   */
  disableFormControls(formControlsNames: string[]) {
    const formControlsLen = formControlsNames.length;
    for (let formControlIndex = 0; formControlIndex < formControlsLen; formControlIndex++) {
      this.registerSecondStepForm.controls[formControlsNames[formControlIndex]].disable();
    }
  }

  /**
   * @author Nermeen Mattar
   * @description  enables the form controls with the received names
   * @param {string[]} formControlsNames
   */
  enableFormControls(formControlsNames: string[]) {
    const formControlsLen = formControlsNames.length;
    for (let formControlIndex = 0; formControlIndex < formControlsLen; formControlIndex++) {
      this.registerSecondStepForm.controls[formControlsNames[formControlIndex]].enable();
    }
  }

  /**
   * @author Nermeen Mattar
   * @description calling the register function with different parameters depending on the case, as the new user is the only one who sends
   * the first and last names. Once register is successful a registration success message will be displayed to the new user and the member
   * user while the admin user will get logged in using credentials received from.
   * @param {TeamRegisterInfo} teamInfo
   * @param {AdminRegisterInfo} adminInfo
   */
  register(teamInfo: TeamRegisterInfo, adminInfo: AdminRegisterInfo) {
    this.displaySpinner = true;
    const newUserInfo = this.userType !== 'new' ? {} : {
      firstname: adminInfo.firstName,
      lastname: adminInfo.lastName
    };
    const adminPassword = adminInfo.adminPassword || adminInfo.adminNewPassword;
    this.authService.register({
      ...newUserInfo,
      teamname: teamInfo.teamName,
      teampassword: teamInfo.teamPassword,
      email: teamInfo.email,
      adminpassword: adminPassword
    }).subscribe(registerRes => {
      if (this.userType === 'admin') {
        this.adminLogin(teamInfo.email, adminPassword);
      } else {
        this.displayMessageCard = true;
        this.displaySpinner = false;
      }
    }, err => {
      this.displaySpinner = false;
      this.handleRegisterError(err);
    });
  }

  /**
   * @author Nermeen Mattar
   * @description this function uses the admin user and password to login if the password is a correct admin password.
   * will appear again
   * @param {string} adminEmail
   * @param {string} adminPassword
   */
  adminLogin(adminEmail: string, adminPassword: string) {
    this.authService.switchToAdmin({
      username: adminEmail,
      password: adminPassword
    }).subscribe(loginRes => {
      this.displaySpinner = false;
    }, err => {
      this.handleLoginError(err);
    });
  }

  /**
   * @author Nermeen Mattar
   * @description requests the backend to resend the activation mail to the email the user entered
   */
  resendConfirmationEmail() {
    this.displaySpinner = true;
    this.registerService.resendActivationMail(this.registerFirstStepForm.controls.email.value).subscribe(res => {
      this.displaySpinner = false;
    }, err => {
      this.displaySpinner = false;
    });
  }

  /**
   * @author Nermeen Mattar
   * @description handles the registration fail
   */
  handleRegisterError(err) {
    /* 409 conflict the user already registered but email not confirmed, q: what if the user is an admin but conflict in the team name */
    if (this.userType === 'admin') {
      /* this.userMessagesService.showUserMessage({}, 'fail'); */
    }
     /* will consider anything else as wrong password */
  }

  /**
   * @author Nermeen Mattar
   * @description handles the login fail
   */
  handleLoginError(err) {
    this.displaySpinner = false;
    if (err.error.message === 'error.mail.not.confirmed') {
      this.informUserToActivateEmail(); /* better to move this to happen in the first step (checking).. need support from backend */
    }
  }

  /**
   * @author Nermeen Mattar
   * @description displays a message to inform the user of the need to activate email. A resend activation mail link will be displayed too.
   */
  informUserToActivateEmail() {
    this.emailActivationRequired = true;
    this.displayMessageCard = true;
  }
}
