import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../auth/services/auth.service';
import { FieldValidatorsService } from '../../core/services/field-validators.service';
import { MembersService } from '../../members/services/members.service';
import { subscribeOn } from 'rxjs/operators';
import { State } from '../../models/state';

@Component({
  selector: 'tc-activation-member-form',
  templateUrl: './member-activation-form.component.html',
  styleUrls: ['./member-activation-form.component.scss']
})
export class MemberActivationFormComponent implements OnInit {
  displaySpinner;
  displayError = false;
  memberActivationGroup: FormGroup;
  memberActivationHash: string;
  displayPageNotFound: boolean;
  // mode: either "invitation" or "setuppassword"
  mode: string;
  invitationState;
  State = State;
  constructor(private membersService: MembersService, activatedRoute: ActivatedRoute,
    private fieldValidatorsService: FieldValidatorsService, private authService: AuthService, private router: Router) {
      this.displaySpinner = true;
      const queryParams = activatedRoute.snapshot.queryParams;
      this.memberActivationHash = queryParams && queryParams['h'];
      if (this.router.url.includes('setuppassword') && this.memberActivationHash){
        this.mode = 'setuppassword'
        this.checkHash();
        // need to send a check request to check the hash and receive the user info.
      }
      else if (this.router.url.includes('invitation') && this.memberActivationHash){
        this.mode = 'invitation'
        this.membersService.acceptInvitation({hash: this.memberActivationHash}).subscribe(
          res => {
            this.invitationState = State.SUCCESS;
          }, err => {
            this.displayError = true;
            this.invitationState = State.ERROR;
          }
        );
      }
      else {
        this.displayPageNotFound = true;
      }
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description creates the member's form group along with form controls. With each created form control two things are passed;
   * First the field's value which is initially empty, and second is the validators based on the validation rules.
   */
  createMemberForm() {
    this.memberActivationGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, this.fieldValidatorsService.getValidator('validatePassword')]),
    });
  }

  /**
   * @author Tobias Trusch
   * @description sends the hash to the backend to check if it's the first login or if the user just have to accept the invitation
   */
  checkHash() {
    this.membersService.activateCheckMember({hash: this.memberActivationHash}).subscribe(
      res => {
        this.displaySpinner = false;
        this.createMemberForm();
      }, err => {
        this.displaySpinner = false;
      }
    );
  }

  /**
   * @author Nermeen Mattar
   * @description takes the user changes map properties to match the ones required by the backend then either updates or creates an member
   * and navigates back upon successfully saving the member.
   * @param {any} memberValue
   */
  sendMemberInfo(memberValue) {
    this.displaySpinner = true;
    this.membersService.activateMember({hash: this.memberActivationHash, ...memberValue}).subscribe(
      res => {
        this.authService.login({username: res.email, password: memberValue.password}).subscribe(
          res=> {
            this.displaySpinner = false;
          },
          err=>{this.displaySpinner = false;}
        );
      }, err => {
        this.displaySpinner = false;
        this.displayError = true;
      }
    );
  }
}
