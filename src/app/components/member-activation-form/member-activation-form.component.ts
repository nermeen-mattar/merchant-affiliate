import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../auth/services/auth.service';
import { FieldValidatorsService } from '../../core/services/field-validators.service';
import { MembersService } from '../../members/services/members.service';

@Component({
  selector: 'tc-activation-member-form',
  templateUrl: './member-activation-form.component.html',
  styleUrls: ['./member-activation-form.component.scss']
})
export class MemberActivationFormComponent implements OnInit {
  memberActivationGroup: FormGroup;
  memberActivationHash: string;
  displayPageNotFound: boolean;
  constructor(private membersService: MembersService, activatedRoute: ActivatedRoute, 
    private fieldValidatorsService: FieldValidatorsService, private authService: AuthService) {
      const queryParams = activatedRoute.snapshot.queryParams;
      this.memberActivationHash = queryParams && queryParams['h'];
      if (!this.memberActivationHash) {
         this.displayPageNotFound = true;
      } else {
        // need to send a check request to check the hash and receive the user info.
      }
      this.createMemberForm();
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
   * @author Nermeen Mattar
   * @description takes the user changes map properties to match the ones required by the backend then either updates or creates an member
   * and navigates back upon successfully saving the member.
   * @param {any} memberValue
   */
  sendMemberInfo(memberValue) {
      this.membersService.activateMember({hash: this.memberActivationHash, ...memberValue}).subscribe(res => {
        this.authService.login({username: 'nermeenmattar5d@gmail.com', 
        //need to receive it from the backend while hash check
        password: memberValue.password})
      });
  }

}
