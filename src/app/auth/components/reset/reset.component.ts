import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'tc-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  displaySpinner
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
      if (res.statusCode) { // temp until the backend fixes the case of email not confirmed by returning an error
        this.displaySpinner = false;
      }
    }, err => {
      this.displaySpinner = false;
    });
  }
}
