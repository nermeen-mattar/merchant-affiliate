import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from './../../../core/services/user.service';
import { TcMember } from './../../../members/models/tc-member.model';
import { LoginStatusService } from './../../../auth/services/login-status.service';
import { TeamsService } from './../../../core/services/teams.service';
import { MembersService } from './../../../members/services/members.service';
import { FieldValidatorsService } from '../../../core/services/field-validators.service';
import { TcTeamInfo } from '../../../teams/models/tc-team-info.model';
@Component({
  selector: 'tc-member-settings',
  templateUrl: './member-settings.component.html',
  styleUrls: ['./member-settings.component.scss']
})
export class MemberSettingsComponent implements OnInit {
  memberBasicSettingsGroup: FormGroup;
  changePasswordGroup: FormGroup;
  teamNameControl: FormControl;
  selectedTeamInfo: TcTeamInfo;
  teamsTheUserIsAdminOf: TcTeamInfo[];
  isEditingTeamName: boolean;
  userEmail: string;
  currentMember: TcMember;
  @ViewChild('teamNameField') teamNameField;

  constructor(private membersService: MembersService, private teamsService: TeamsService,
    private fieldValidatorsService: FieldValidatorsService, private userService: UserService, private loginStatusService: LoginStatusService) {
    this.teamsTheUserIsAdminOf = this.teamsService.getTeamsTheUserIsAdminOf();
    if(this.teamsTheUserIsAdminOf.length) {
      this.selectedTeamInfo = this.teamsTheUserIsAdminOf[0];
    }
  }

  ngOnInit() {
    this.userEmail = this.userService.username;
    // this.currentMember = {
    //   firstName: this.userService.firstName,
    //   lastName: this.userService.lastName,
    //   mobile: this.userService.mobile
    //   /* should allowReminders */
    // }
    this.membersService.getMember(this.userService.memberId).subscribe(currentMemberInfo => {
      this.currentMember = currentMemberInfo;
      this.initSettingsForm();
    });
  }

  /**
   * @author Nermeen Mattar
   * @description gets the info for the current selected by its id
   * @returns {TcTeamInfo}
   */
  getInfoForSelectedTeam(): TcTeamInfo {
    return this.teamsTheUserIsAdminOf.filter(userTeam => userTeam.teamId === 55)[0]; // this.idForTeamToEdit
  }

  /**
   * @author Nermeen Mattar
   * @description calls the funcitons that create the settings form and standalone from controls.
   */
  initSettingsForm() {
    this.createBasicSettingsForm();
    this.createChangePasswordForm();
    if(this.teamsTheUserIsAdminOf.length) {
      this.createTeamNameFromControl();
    }
  }

  /**
   * @author Nermeen Mattar
   * @description creates the member form group along with its form controls and their validation rules.
   */
  createBasicSettingsForm() {
    this.memberBasicSettingsGroup = new FormGroup({
      firstName: new FormControl(this.currentMember.firstName),
      lastName: new FormControl(this.currentMember.lastName),
      mobile: new FormControl(this.currentMember.mobile, this.fieldValidatorsService.getValidator('number')),
      allowReminders: new FormControl(this.currentMember.allowReminders, [Validators.required])
    });
    this.memberBasicSettingsGroup.markAsUntouched();
  }

  createChangePasswordForm() {
    this.changePasswordGroup = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required])
    });
  }

  /**
   * @author Nermeen Mattar
   * @description creates  team name from controls.
   */
  createTeamNameFromControl() {
    this.teamNameControl = new FormControl(this.selectedTeamInfo.teamName, [Validators.required]);
  }

  /**
   * @author Nermeen Mattar
   * @description deletes the logged in user account.
   */
  changeTeamNameControlValue() {
    this.teamNameControl.setValue(this.selectedTeamInfo.teamName);
  }

  /**
   * @author Nermeen Mattar
   * @description sends the new password the user provided as an attempt to change the password
   */
  changePassword() {
    this.membersService.changePassword(this.changePasswordGroup.value).subscribe(successfulyChanged => {
      this.loginStatusService.loginState.next({
        isAuthorized: false,
        logoutResponse: true
      });
    });
  }

  /**
   * @author Nermeen Mattar
   * @description calls the function to update the team name.
   */
  saveTeamName() {
    this.teamsService.changeTeamName(this.teamNameControl.value, this.selectedTeamInfo.teamId);
    this.teamNameControl.reset();
  }


  /**
   * @author Nermeen Mattar
   * @description takes the user changes then calls the function to update the member settings.
   */
  saveMemberBasicInfoSettings() {
    if(this.memberBasicSettingsGroup.untouched) {
      return;
    }
    const updatedMemberValue = this.memberBasicSettingsGroup.value;
    Object.keys(updatedMemberValue).forEach(propertyName => {
      this.deletePropertyValueIfNotTouched(propertyName, updatedMemberValue);
    });
    this.membersService.updateMember(this.userService.memberId, updatedMemberValue).subscribe(res => {
      this.memberBasicSettingsGroup.markAsUntouched();
      this.currentMember = { ...this.currentMember,
        ...updatedMemberValue
      };
      Object.keys(updatedMemberValue).forEach(propertyName => {
        this.userService[propertyName] = updatedMemberValue[propertyName];
      })
    });
  }
  deletePropertyValueIfNotTouched(propertyName, updatedMemberValue) {
    if (this.memberBasicSettingsGroup.controls[propertyName].untouched) {
      delete updatedMemberValue[propertyName];
    }
  }

  deleteMyAccount() {
    this.membersService.deleteMyAccount();
  }

}
