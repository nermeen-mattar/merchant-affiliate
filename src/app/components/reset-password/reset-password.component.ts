import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './../../auth/services/auth.service';
import { FieldValidatorsService } from './../../core/services/field-validators.service';

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
  resetPasswordForm: FormGroup;
  constructor(activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router,
  private fieldValidatorsService: FieldValidatorsService) {
    const queryParams = activatedRoute.snapshot.queryParams;
    this.hash = queryParams && queryParams['h']
    if (!this.hash) {
      this.displayPageNotFound = true;
    } else {
      // send a check request to check the hash
      this.createResetPasswordForm();
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
    this.authService.resetPassword(resetFormValue.password, this.hash).subscribe(res => {
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