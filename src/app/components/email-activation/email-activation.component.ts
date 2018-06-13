import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { HttpRequestsService } from '../../core/services/http-requests.service';
import { MailActivationState } from '../../models/mail-activation-state.model';

@Component({
  selector: 'tc-email-activation',
  templateUrl: './email-activation.component.html',
  styleUrls: ['./email-activation.component.scss']
})
export class EmailActivationComponent implements OnInit {
  displaySpinner: boolean;
  displayPageNotFound: boolean;
  mailState: number = MailActivationState.SUCCESS;
  userInfo: {
    firstname: string,
    lastname: string,
    email: string
  };
  mailActivationState = MailActivationState;
  constructor(activatedRoute: ActivatedRoute, httpRequestsService: HttpRequestsService) {
    this.displaySpinner = true;
    const queryParams = activatedRoute.snapshot.queryParams;
    if (queryParams && queryParams['h']) {
      httpRequestsService.httpPost('activation', {
        hash: queryParams['h']
      }, {
        fail: 'NO_ERROR_MESSAGE'
      }).subscribe(
        res => {
          this.displaySpinner = false;
          this.userInfo = res;
          this.mailState = MailActivationState.SUCCESS;
        }, err => {
          this.displaySpinner = false;
          if (err.error.message === 'error.mail.confirmed') {
            this.mailState = MailActivationState.ALREADY_ACTIVATED;
          } else {
            this.mailState = MailActivationState.ACTIVATION_LINK_EXPIRED;
          }
        });
    } else {
      this.displayPageNotFound = true;
    }
  }

  ngOnInit() {}

}
