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
  navigateToRegisterPage(teamName) {
    this.router.navigate(['/auth/register'], {
      queryParams: {
        'team-name': teamName
      }
    });
  }

}
