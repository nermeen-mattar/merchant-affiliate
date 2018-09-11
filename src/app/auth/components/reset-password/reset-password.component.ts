import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FieldValidatorsService } from '../../../core/services/field-validators.service';
import { State } from '../../../models/state';
import { TcMember } from '../../../members/models/tc-member.model';

@Component({
  selector: 'tc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  displaySpinner;
  displayPageNotFound: boolean;
  displayErrorMessage;
  hash: string;
  userInfo: TcMember;
  linkState: number = State.SUCCESS;
  resetState: number = State.SUCCESS;
  resetPasswordForm: FormGroup;
  constructor(activatedRoute: ActivatedRoute, private authService: AuthService, private fieldValidatorsService: FieldValidatorsService) {
    const queryParams = activatedRoute.snapshot.queryParams;
    if (queryParams && queryParams['h']) {
      debugger;
      this.authService.checkResetPasswordLink( queryParams['h']).subscribe(
        res => {
          this.displaySpinner = false;
          this.userInfo = res;
          this.linkState = State.SUCCESS;
          this.createResetPasswordForm();
        }, err => {
          this.displaySpinner = false;
          this.linkState = State.ERROR;
        });
    } else {
      this.displayPageNotFound = true;
    }
  }

  ngOnInit() {}

  createResetPasswordForm() {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, this.fieldValidatorsService.getValidator('validatePassword')])
    });
  }


    /**
   * @author Nermeen Mattar
   * @description change the user password to the passed password.
   * @param {string} password
   */
  resetPassword(password: string) {
    this.displaySpinner = true;
    this.authService.resetPassword(password, this.hash).subscribe(res => {
      // this.displayErrorMessage = true;
      this.displaySpinner = false;
    }, err => {
      // this.displayErrorMessage = true;
      this.displayPageNotFound = true;
      this.displaySpinner = false;

    });
  }
}