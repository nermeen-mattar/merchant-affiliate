import { MembersService } from './../../../members/services/members.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TeamsService } from './../../../core/services/teams.service';
import { FieldValidatorsService } from '../../../core/services/field-validators.service';
import { TcTeamInfo } from '../../../teams/models/tc-team-info.model';
@Component({
  selector: 'tc-member-settings',
  templateUrl: './member-settings.component.html',
  styleUrls: ['./member-settings.component.scss']
})
export class MemberSettingsComponent implements OnInit {
  memberBasicSettingsGroup: FormGroup;
  changeEmailGroup: FormGroup;
  changePasswordGroup: FormGroup;
  teamNameControl: FormControl;
  selectedTeamInfo: TcTeamInfo;
  teamsTheUserIsAdminOf: TcTeamInfo[];
  isEditingTeamName: boolean;
  @ViewChild('teamNameField') teamNameField;

  constructor(private membersService: MembersService, private teamsService: TeamsService) {
    this.teamsTheUserIsAdminOf = this.teamsService.getTeamsTheUserIsAdminOf();
    this.selectedTeamInfo = this.teamsTheUserIsAdminOf[0];
    this.initSettingsForm();
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description gets the info for the current selected by its id
   * @returns {TcTeamInfo}
   */
  getInfoForSelectedTeam(): TcTeamInfo {
    return this.teamsTheUserIsAdminOf.filter(userTeam => userTeam.teamId ===  55)[0]; // this.idForTeamToEdit
  }

  /**
   * @author Nermeen Mattar
   * @description calls the funcitons that create the settings form and standalone from controls.
   */
  initSettingsForm() {
    this.createBasicSettingsForm();
    this.createChangeEmailForm();
    this.createChangePasswordForm();
    this.createTeamNameFromControl();
  }

  /**
   * @author Nermeen Mattar
   * @description creates the member form group along with its form controls and their validation rules.
   */
  createBasicSettingsForm() {
    this.memberBasicSettingsGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl(''),
      allowReminders: new FormControl(false, [Validators.required])
    });
  }

  createChangeEmailForm() {
    this.changeEmailGroup = new FormGroup({ 
      email: new FormControl('', [Validators.required, Validators.email]),
      newEmail: new FormControl('', [Validators.required, Validators.email])
    });
  }

  createChangePasswordForm() {
    this.changePasswordGroup = new FormGroup({ 
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required])
    });
  }

  /**
   * @author Nermeen Mattar
   * @description creates the standalone from controls  which are team name and password form controls.
   */
  createTeamNameFromControl() {
    this.teamNameControl = new FormControl('', [Validators.required]);
  }

  /**
   * @author Nermeen Mattar
   * @description takes the user changes then calls the function to update the member settings.
   */
  saveMemberBasicInfoSettings() {
    // this.membersService.updateMember(this.memberBasicSettingsGroup.value);
  }

    
  /**
   * @author Nermeen Mattar
   * @description sends the new password the user provided as an attempt to change the password
   */
  changePassword() {
    this.membersService.changePassword(this.changePasswordGroup.value);
  }
      
  /**
   * @author Nermeen Mattar
   * @description sends the new password the user provided as an attempt to change the password
   */
  changeEmail() {
    this.membersService.changeEmail(this.changePasswordGroup.value);
  }

  /**
   * @author Nermeen Mattar
   * @description calls the function to update the team name.
   */
  saveTeamName() {
      this.teamsService.changeTeamName(this.teamNameControl.value, this.selectedTeamInfo.teamId);
      this.teamNameControl.reset();
  }
}
