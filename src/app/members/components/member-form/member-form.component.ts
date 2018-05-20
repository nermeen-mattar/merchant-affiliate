import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MembersService } from '../../services/members.service';
import { UserService } from '../../../core/services/user.service';
import { TcMember } from '../../models/tc-member.model';

@Component({
  selector: 'tc-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  selectedTeamId: number;
  memberGroup: FormGroup;
  memberId: number; /* is undefined (in the case of member creation) */
  constructor(private membersService: MembersService, userService: UserService,
    private route: ActivatedRoute, private router: Router) {
    this.selectedTeamId = userService.selectedTeam.teamId;
    this.initFormEditingOrCreating();
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description checks the memberId param passed in the route to know if the user is trying to create a new member or edit
   * an existing member if the memberId param not equal to 'new', a request is sent to get the member with that Id.
   */
  initFormEditingOrCreating() {
    const memberIdVariable = this.route.snapshot.params['memberId'];
    this.createMemberForm();
    if (memberIdVariable !== 'new') {
      this.memberId = memberIdVariable;
      this.leavePageIfWrongId();
      this.membersService.getMember(this.memberId).subscribe(res => {
        this.updateMemberValues(res);
      });
    }
  }

  /**
   * @author Nermeen Mattar
   * @description creates the member's form group along with form controls. With each created form control two things are passed;
   * First the field's value which is initially empty, and second is the validators based on the validation rules.
   */
  createMemberForm() {
    this.memberGroup = new FormGroup({
      firstName: new FormControl( '', [Validators.required]),
      lastName: new FormControl( '', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  /**
   * @author Nermeen Mattar
   * @description updates the member's form group with the received value.
   * @param {TcMember} memberValue
   */
  updateMemberValues(memberValue: TcMember) {
    this.memberGroup.patchValue({
      firstName: memberValue.firstname,
      lastName: memberValue.lastname,
      email: memberValue.email
    });
  }

  /**
   * @author Nermeen Mattar
   * @description takes the user changes map properties to match the ones required by the backend then either updates or creates an member
   * and navigates back upon successfully saving the member.
   * @param {any} memberValue
   */
  save(memberValue) {
    const memberValueForBackend = this.getMemberInBackendStructure(memberValue);
    if (this.memberId) {
      this.membersService.updateMember(this.memberId, this.selectedTeamId, memberValueForBackend).subscribe(res => {
        this.navigateBack();
      });
    } else {
      this.membersService.createMember(this.selectedTeamId, memberValueForBackend).subscribe(res => {
        this.navigateBack();
      });
    }
  }

  /**
   * @author Nermeen Mattar
   * @description maps the properties in the received object to the structure required by the backend and formats the date.
   * @param {any} memberValue
   */
  getMemberInBackendStructure(memberValue): TcMember {
    const memberValueCopy: TcMember = {
      firstname: memberValue.firstName,
      lastname: memberValue.lastName,
      email: memberValue.email
    };
    return memberValueCopy;
  }

  /**
   * @author Nermeen Mattar
   * @description navigates back if the id passed in the route does not include numbers (wrong id)
   */
  leavePageIfWrongId() {
    if (this.memberId && this.memberId.toString().match(/[1-9]/g) === null) {
      this.navigateBack();
    }
  }

  /**
   * @author Nermeen Mattar
   * @description navigates to the page the user was previously in.
   */
  navigateBack() {
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }
}
