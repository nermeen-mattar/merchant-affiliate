import { BusinessApi } from './../../../sdk/services/custom/Business';
import { DealApi } from './../../../sdk/services/custom/Deal';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';


import { FieldValidatorsService } from './../../../core/services/field-validators.service';
import { userCheckBackendResponse } from '../../../core/constants/user-check-backend-response.constats';
import { UserService } from '../../../core/services/user.service';
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
  name: string;
  dealFirstStepForm: FormGroup;
  dealSecondStepForm: FormGroup;
  dealThirdStepForm: FormGroup;
  itemsList;
  businessList;
  constructor(
    private dealApi: DealApi,
    private fieldValidatorsService: FieldValidatorsService,
    private businessApi: BusinessApi,
    private userService: UserService
    ) {
      userService.itemsList().subscribe(itemsList => {
        this.itemsList = itemsList;
      });
      // businessApi get all businesses
      this.businessApi.find({ fields: {id: true, name: true, image: true} }).subscribe(data => {
        this.businessList = data;
      });
  }

  /*
    "name"?: string;
  "description"?: string;
  "limit"?: string;
  "src_business"?: any;
  "target_business_types"?: Array<any>;
  "target_businesses"?: Array<any>;
  "status"?: string;
  "id"?: any;*/

  ngOnInit() {
    this.createDealFirstStepForm();
    this.createDealSecondStepForm();
    this.createDealThirdStepForm();

  }

  // selectedStepChanged(changeInfo: StepperSelectionEvent) {
  //   if (changeInfo.previouslySelectedIndex === 0) {
  //     this.checkIfNewUser(changeInfo.previouslySelectedStep.stepControl.value);
  //   }
  //   this.currentStep = changeInfo.selectedIndex + 1;
  // }

  createDealFirstStepForm() {
    this.dealFirstStepForm = new FormGroup({
      name: new FormControl(this.name || '', [Validators.required]),
      description: new FormControl(''),
      limit: new FormControl('',  [Validators.required])

    });
  }

  createDealSecondStepForm() {
    this.dealSecondStepForm = new FormGroup({
      target_business_types: new FormControl(''),
      target_businesses: new FormControl(''),
      businesses: new FormControl(''),
      openFor: new FormControl('')
    });
  }


createDealThirdStepForm() {
  this.dealThirdStepForm = new FormGroup({
    item: new FormControl('', ),
    number_of_items: new FormControl('', [Validators.required]),
  });
}




  /**
   * @author Nermeen Mattar
   * @description change the view based on the user check result.
   * Cases: 1) New user: all of the fields will be displayed. 2) Confirmed member:
   * Only the password and isTeamMember fields should be displayed 3) Confirmed member: non of the fields should be displayed.
   * @param {string} checkResult
   */
  changeNextStepBasedOnUserCheckResult(checkResult: string) {
    switch (checkResult) {
      case userCheckBackendResponse.newUser:
        this.isNewUser = true;
        this.enableFormControls(['firstName', 'lastName', 'confirmTerms']);
        break;
      case userCheckBackendResponse.confirmedMember:
        this.isNewUser = false;
        this.disableFormControls(['firstName', 'lastName', 'confirmTerms']);
        break;
      case userCheckBackendResponse.nonConfirmedMember:
        this.dealSecondStepForm.disable();
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
      this.dealSecondStepForm.controls[formControlsNames[formControlIndex]].disable();
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
      this.dealSecondStepForm.controls[formControlsNames[formControlIndex]].enable();
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
  register(firstStepValues, secondStepValues, thirdStepValues) {
    this.displaySpinner = true;
    this.dealApi.create({
      ...firstStepValues,
      ...secondStepValues,
      ...thirdStepValues
      // src_business: get it from local storage
    }).subscribe(registerRes => {
        this.displayMessageCard = true;
        this.displaySpinner = false;
    }, err => {
      this.displaySpinner = false;
    });
  }
}
