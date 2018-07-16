import { MembersService } from './../../../members/services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import { RegisterService } from './../../services/register.service';
import { FieldValidatorsService } from './../../../core/services/field-validators.service';
import { AdminService } from './../../../core/services/admin.service';
import { AuthService } from '../../services/auth.service';
import { MemberRegisterInfo } from './../../models/member-register-info.model';
import { TeamRegisterInfo } from './../../models/team-register-info.model';
import { UserMessagesService } from '../../../core/services/user-messages.service';
import { roles } from '../../../core/constants/roles.constants';
@Component({
  selector: 'tc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isNewUser: boolean; /* possible values: 'admin' 'member' 'new'. Default value is 'new' */
  displaySpinner = false;
  emailActivationRequired = false;
  displayMessageCard = false;
  teamName: string;
  registerFirstStepForm: FormGroup;
  registerSecondStepForm: FormGroup;
  currentStep = 1;
  displayPassword: boolean;
  roles = roles; /* needed to declare a class property to make it available on the component html */
  constructor(private authService: AuthService, private registerService: RegisterService, activatedRoute: ActivatedRoute, 
    private membersService: MembersService, private fieldValidatorsService: FieldValidatorsService, 
    private userMessagesService: UserMessagesService) {
    const queryParams = activatedRoute.snapshot.queryParams;
    this.teamName = queryParams && queryParams['team-name'];
  }

  ngOnInit() {
    this.createRegisterFirstStepForm();
    this.createRegisterSecondStepForm();
  }

  toggleDisplayPassword() {
    this.displayPassword = !this.displayPassword;
  }

  selectedStepChanged(changeInfo: StepperSelectionEvent) {
    if (changeInfo.previouslySelectedIndex === 0) {
      this.checkIfNewUser(changeInfo.previouslySelectedStep.stepControl.value);
    }
    this.currentStep = changeInfo.selectedIndex + 1;
  }
  createRegisterFirstStepForm() {
    this.registerFirstStepForm = new FormGroup({
      teamName: new FormControl(this.teamName || '', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  createRegisterSecondStepForm() {
    this.registerSecondStepForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, this.fieldValidatorsService.getValidator('validatePassword')]),
      isTeamMember: new FormControl(false),
      confirmTerms: new FormControl(false)
    });
  }

  /**
   * @author Nermeen Mattar
   * @description uses the admin service to check if the admin is already exist. The response has three cases; first, the email might
   * not belong to any user. Second, the email might belong to a user who is not an admin. Third, the email might belong to an admin user.
   * For the first and the third cases the backend returns the result inside an error whereas for the second case the result is inside the
   * response.
   * @param firstStepValue
   */
  checkIfNewUser(firstStepValue: TeamRegisterInfo) { // add typing
    this.displaySpinner = true;
    this.membersService.isMemberExist(firstStepValue.email).subscribe(() => { // user exist
      debugger;
        this.displaySpinner = false;
        this.isNewUser = false;
        this.disableFormControls(['firstName', 'lastName']);
      }, err => {
        this.displaySpinner = false;
        // if (err.status === 409 || err.error.statusCode === 409) { // An admin user is already exist
          // this.disableFormControls(['firstName', 'lastName']); // adminConfirmPassword
        // } else if (err.status === 404 || err.error.statusCode === 404) { // No user Found
          this.isNewUser = true;
          this.enableFormControls(['firstName', 'lastName']); // adminConfirmPassword
        // }
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
   * @param {MemberRegisterInfo} adminInfo
   */
  register(teamInfo: TeamRegisterInfo, adminInfo: MemberRegisterInfo) {
    if(!this.registerSecondStepForm.controls.confirmTerms.value) {
      this.registerSecondStepForm.controls.confirmTerms.markAsDirty();
      return false;
    }
    this.displaySpinner = true;
    const newUserInfo = this.isNewUser ? {
      firstname: adminInfo.firstName,
      lastname: adminInfo.lastName
    } : {};
    const password = adminInfo.password;
    this.authService.register({
      ...newUserInfo,
      teamname: teamInfo.teamName,
      email: teamInfo.email,
      password: password,
      isTeamMember: adminInfo.isTeamMember,
      confirmTerms: adminInfo.confirmTerms
    }).subscribe(registerRes => {
        this.displayMessageCard = true;
        this.displaySpinner = false;
    }, err => {
      this.displaySpinner = false;
      this.handleRegisterError(err);
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
    // if (this.userType === roles.admin) {
      /* this.userMessagesService.showUserMessage({}, 'fail'); */
    // }
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
