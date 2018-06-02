import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { HttpRequestsService } from '../../core/services/http-requests.service';
import { MailActivationState } from '../../models/mail-activation-state.model';
import { AuthService } from './../../auth/services/auth.service';

@Component({
  selector: 'tc-direct-links',
  templateUrl: './direct-links.component.html',
  styleUrls: ['./direct-links.component.scss']
})
export class DirectLinksComponent implements OnInit {
  displaySpinner: boolean;
  displayPageNotFound: boolean;
  hash: string;
  constructor(activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.hash = activatedRoute.snapshot.params['hash'];
    if (!this.hash) {
      this.displayPageNotFound = true;
    }
  }

  /**
   * @author Nermeen Mattar
   * @description attempts to login without a password by using the direct link
   * @param {{userEmail: string}} emailInfo
   */
  loginUsingOnlyEmail(emailInfo: {
    userEmail: string
  }) {
    this.displaySpinner = true;
    this.authService.loginUsingDirectLink(this.hash, emailInfo.userEmail).subscribe(
      res => {}, err => {
        this.displaySpinner = false;
      });
  }

  ngOnInit() {}

}
