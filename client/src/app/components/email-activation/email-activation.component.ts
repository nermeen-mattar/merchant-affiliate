import { LoginStatusService } from './../../../../src/app/auth/services/login-status.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpRequestsService } from '../../core/services/http-requests.service';
import { TcMember } from '../../members/models/tc-member.model';
import { State } from '../../models/state';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'tc-email-activation',
  templateUrl: './email-activation.component.html',
  styleUrls: ['./email-activation.component.scss']
})
export class EmailActivationComponent implements OnInit {
  // displaySpinner = true;
  displayPageNotFound: boolean;
  mailState: number = State.SUCCESS;
  userInfo: TcMember;
  State = State;
  constructor(activatedRoute: ActivatedRoute, httpRequestsService: HttpRequestsService, router: Router,
    userService: UserService, loginStatusService: LoginStatusService) {
    const queryParams = activatedRoute.snapshot.queryParams;
     if (queryParams && queryParams['code']) {
      const urlParams =
      'grant_type=authorization_code&code='.concat(queryParams['code']).
      concat('&client_id=LDMoVlUYyi8OXZBX2964hO4CwWscswl1pvvxHlW0&redirect_uri=http://localhost:5000/activation&client_secret=OJn9Hr41S7C7Z70IOoFxnqa3tNLPYvae6QKjGUZCjaKjhWuqt0PcGm6KlTkPWhTsWyVDMrwEjWDH3YCEjUbBCvBPFQ5WJZBn6BI3K9nxXJ2u9Hkx99U1D5cjCzG7nImX');

      httpRequestsService.httpPost('oauth/token/?'.concat(urlParams), {
        fail: 'NO_ERROR_MESSAGE'
      }).subscribe(
        res => {

          userService.businessInfo().subscribe( businessinfo   => {
            console.log(businessinfo);
            localStorage.setItem('business', JSON.stringify(businessinfo));
            // this.teamsDataSource = new MatTableDataSource(res);
          });
          loginStatusService.onLoginRequestSuccess();


        }, err => {
          console.log(err);
            this.mailState = State.ERROR;
            router.navigateByUrl('my-giveaways');

        });
    } else {
      this.displayPageNotFound = true;
    }
  }



  ngOnInit() {}

}
