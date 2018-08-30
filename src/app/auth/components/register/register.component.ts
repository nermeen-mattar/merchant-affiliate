import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import { MembersService } from './../../../members/services/members.service';
import { RegisterService } from './../../services/register.service';
import { FieldValidatorsService } from './../../../core/services/field-validators.service';
import { AuthService } from '../../services/auth.service';
import { MemberRegisterInfo } from './../../models/member-register-info.model';
import { TeamRegisterInfo } from './../../models/team-register-info.model';
import { UserMessagesService } from '../../../core/services/user-messages.service';
import { roles } from '../../../core/constants/roles.constants';
import { userCheckBackendResponse } from '../../../core/constants/user-check-backend-response.constats';
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
      teamName: new FormControl(this.teamName || '', [Validators.required, Validators.minLength(4) ]),
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
   * @param {TeamRegisterInfo} firstStepValue
   */
  checkIfNewUser(firstStepValue: TeamRegisterInfo) {
    this.displaySpinner = true;
    this.membersService.isMemberExist(firstStepValue.email).subscribe((checkResult) => {
      this.displaySpinner = false;
      this.changeNextStepBasedOnUserCheckResult(checkResult);
      }, err => {
        this.changeNextStepBasedOnUserCheckResult(firstStepValue.teamName); /* temp will be removed once  backend supports this */
        this.displaySpinner = false;
      });
  }

  /**
   * @author Nermeen Mattar
   * @description change the view based on the user check result. Cases: 1) New user: all of the fields will be displayed. 2) Confirmed member: 
   * Only the password and isTeamMember fields should be displayed 3) Confirmed member: non of the fields should be displayed.
   * @param {string} checkResult
   */
  changeNextStepBasedOnUserCheckResult(checkResult: string) {
    switch(checkResult) {
      case userCheckBackendResponse.newUser: 
      this.isNewUser = true;
      this.enableFormControls(['firstName', 'lastName', 'confirmTerms']);
      break;
      case userCheckBackendResponse.confirmedMember: 
      this.isNewUser = false;
      this.disableFormControls(['firstName', 'lastName', 'confirmTerms']);
      break;
      case userCheckBackendResponse.nonConfirmedMember:
      this.registerSecondStepForm.disable();
      this.informUserToActivateEmail();
      break;
    }
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
    if(this.isNewUser && !this.registerSecondStepForm.controls.confirmTerms.value) {
      this.registerSecondStepForm.controls.confirmTerms.markAsDirty();
      return false;
    }
    this.displaySpinner = true;
    const newUserInfo = this.isNewUser ? {
      firstName: adminInfo.firstName,
      lastName: adminInfo.lastName
    } : {};
    const password = adminInfo.password;
    this.authService.register({
      ...newUserInfo,
      teamName: teamInfo.teamName,
      email: teamInfo.email,
      password: password,
      isTeamMember: adminInfo.isTeamMember,
      confirmTerms: adminInfo.confirmTerms
    }).subscribe(registerRes => {
        this.displayMessageCard = true;
        this.displaySpinner = false;
    }, err => {
      this.displaySpinner = false;
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
