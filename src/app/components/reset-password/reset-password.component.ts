import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { HttpRequestsService } from '../../core/services/http-requests.service';
import { MailActivationState } from '../../models/mail-activation-state.model';
import { TcMember } from '../../members/models/tc-member.model';

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
  constructor(activatedRoute: ActivatedRoute, private authService: AuthService) {
    const queryParams = activatedRoute.snapshot.queryParams;
    this.hash = queryParams && queryParams['h']
    if (!this.hash) {
      this.displayPageNotFound = true;
    }
  }

  ngOnInit() {}

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