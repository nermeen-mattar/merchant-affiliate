import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MembersService } from '../../services/members.service';

@Component({
  selector: 'tc-activation-member-form',
  templateUrl: './member-activation-form.component.html',
  styleUrls: ['./member-activation-form.component.scss']
})
export class MemberActivationFormComponent implements OnInit {
  memberActivationGroup: FormGroup;
  memberId: number; /* is undefined (in the case of member creation) */
  constructor(private membersService: MembersService,
    private route: ActivatedRoute, private router: Router) {
    this.initActivationForm();
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description checks the memberId param passed in the route to know if the user is trying to create a new member or edit
   * an existing member if the memberId param not equal to 'new', a request is sent to get the member with that Id.
   */
  initActivationForm() {
    const memberIdVariable = this.route.snapshot.params['memberId'];
    this.createMemberForm();
    this.memberId = memberIdVariable;
  }

  /**
   * @author Nermeen Mattar
   * @description creates the member's form group along with form controls. With each created form control two things are passed;
   * First the field's value which is initially empty, and second is the validators based on the validation rules.
   */
  createMemberForm() {
    this.memberActivationGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    });
  }

  /**
   * @author Nermeen Mattar
   * @description takes the user changes map properties to match the ones required by the backend then either updates or creates an member
   * and navigates back upon successfully saving the member.
   * @param {any} memberValue
   */
  sendMemberInfo(memberValue) {
    if (this.memberId) {
      this.membersService.updateMember(this.memberId, memberValue).subscribe(res => {
        // this.navigateBack();
      });
    }
  }

}
