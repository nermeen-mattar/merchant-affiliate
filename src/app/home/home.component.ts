import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {}
/**
 * @author Nermeen Mattar
 * @description navigates the user to the register page while passing the enetered team name in the URL as a query parameter
 * @param {string} teamName
 */
navigateToRegisterPage(teamName: string) {
  debugger;
  const passTeamName = teamName ? {
    queryParams: {
      'team-name': teamName
    }
  } : {};
    this.router.navigate(['/auth/register'], passTeamName);
  }

}
