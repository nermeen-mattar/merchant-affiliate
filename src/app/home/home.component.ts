import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'tc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  teamName: FormControl;

  constructor(private router: Router) {
    this.teamName = new FormControl('', [Validators.required]);
  }

  ngOnInit() {}
  navigateToRegisterPage() {
    this.router.navigate(['/auth/register'], {
      queryParams: {
        'team-name': this.teamName.value
      }
    });
  }

}
