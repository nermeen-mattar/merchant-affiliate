import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'tc-reset',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.scss']
})
export class ResetComponent implements OnInit {
  displaySpinner;
  displayMessageCard;
  constructor( private authService: AuthService) {}
  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description rquests to reset password for the entered email.
   * @param {string} email
   */
  requestResetPassword(email: string) {
    this.displaySpinner = true;
    this.authService.requestResetPassword(email).subscribe(res => {
      this.displayMessageCard = true;
      this.displaySpinner = false;
    }, err => {
      this.displayMessageCard = true;

      this.displaySpinner = false;
    });
  }
}
