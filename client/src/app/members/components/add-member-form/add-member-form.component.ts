import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TeamsService } from './../../../core/services/teams.service';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'tc-add-member-form',
  templateUrl: './add-member-form.component.html',
  styleUrls: ['./add-member-form.component.scss']
})
export class AddMemberFormComponent implements OnInit {
  selectedTeamId: number;
  addMemberGroup: FormGroup;
  constructor(private membersService: MembersService, teamsService: TeamsService,
    private route: ActivatedRoute, private router: Router) {
    this.selectedTeamId = teamsService.selectedTeamId;
    this.createMemberForm();
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description creates the member's form group along with form controls. With each created form control two things are passed;
   * First the field's value which is initially empty, and second is the validators based on the validation rules.
   */
  createMemberForm() {
    this.addMemberGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  /**
   * @author Nermeen Mattar
   * @description takes the user changes map properties to match the ones required by the backend then either updates or creates an member
   * and navigates back upon successfully saving the member.
   * @param {any} memberValue
   */
  addMemberToTeam(memberValue) {
      this.membersService.createMember(this.selectedTeamId, memberValue).subscribe(res => {
        this.navigateBack();
      });
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
