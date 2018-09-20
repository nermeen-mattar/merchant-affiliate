import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './../../auth/services/auth.service';
import { FieldValidatorsService } from './../../core/services/field-validators.service';
import { HttpRequestsService } from '../../core/services/http-requests.service';
import { State } from '../../models/state';

@Component({
  selector: 'tc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  displaySpinner = true;
  displayPageNotFound: boolean;
  displayErrorMessage;
  hash: string;
  resetPasswordForm: FormGroup;
  checkResetState = State.SUCCESS;
  mail;
  State = State;
  constructor(activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router,
  private fieldValidatorsService: FieldValidatorsService, httpRequestsService: HttpRequestsService) {
    const queryParams = activatedRoute.snapshot.queryParams;
    this.hash = queryParams && queryParams['h']
    if (!this.hash) {
      this.displayPageNotFound = true;
    } else {
      httpRequestsService.httpPost('recovery/reset-password/check', {
        hash: queryParams['h']
      }, {
        fail: 'NO_ERROR_MESSAGE'
      }).subscribe(
        res => {
          this.displaySpinner = false;
          this.checkResetState = State.SUCCESS;
          this.mail = res.mail
          // send a check request to check the hash
          this.createResetPasswordForm();
        }, err => {
          this.displaySpinner = false;
          this.checkResetState = State.ERROR;
        });

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
   */
  resetPassword(resetFormValue) {
    this.displaySpinner = true;
    this.authService.resetPassword(resetFormValue.password, this.hash, this.mail).subscribe(res => {
      // this.displayErrorMessage = true;
      this.router.navigateByUrl('auth/login');
      this.displaySpinner = false;
    }, err => {
      // this.displayErrorMessage = true;
      this.displayPageNotFound = true;
      this.displaySpinner = false;

    });
  }
}
