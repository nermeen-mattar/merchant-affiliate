import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'tc-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  displaySpinner;
  displayMessageCard;
  constructor( private authService: AuthService) {}
  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description sends a request to reset password for the entered email.
   * @param {string} email
   */
  resetPassword(email: string) {
    this.displaySpinner = true;
    this.authService.resetPassword(email).subscribe(res => {
      this.displayMessageCard = true;
      this.displaySpinner = false;
    }, err => {
      this.displayMessageCard = true;

      this.displaySpinner = false;
    });
  }
}
