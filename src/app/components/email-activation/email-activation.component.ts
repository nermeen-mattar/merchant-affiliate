import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpRequestsService } from '../../core/services/http-requests.service';
import { TcMember } from '../../members/models/tc-member.model';
import { State } from '../../models/state';

@Component({
  selector: 'tc-email-activation',
  templateUrl: './email-activation.component.html',
  styleUrls: ['./email-activation.component.scss']
})
export class EmailActivationComponent implements OnInit {
  displaySpinner = true;
  displayPageNotFound: boolean;
  mailState: number = State.SUCCESS;
  userInfo: TcMember;
  State = State;
  constructor(activatedRoute: ActivatedRoute, httpRequestsService: HttpRequestsService) {
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
          this.mailState = State.SUCCESS;
        }, err => {
          this.displaySpinner = false;
          debugger;
          if (err.error.message === 'error.mail.confirmed') {
            this.mailState = State.OTHER;
          } else {
            this.mailState = State.ERROR;
          }
        });
    } else {
      this.displayPageNotFound = true;
    }
  }

  ngOnInit() {}

}
