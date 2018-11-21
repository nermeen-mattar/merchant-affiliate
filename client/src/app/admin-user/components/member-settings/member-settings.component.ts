import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { first } from 'rxjs/operators';

import { UserService } from './../../../core/services/user.service';
import { TcMember } from './../../../members/models/tc-member.model';
import { LoginStatusService } from './../../../auth/services/login-status.service';
import { TeamsService } from './../../../core/services/teams.service';
import { MembersService } from './../../../members/services/members.service';
import { FieldValidatorsService } from '../../../core/services/field-validators.service';
import { TcTeamInfo } from '../../../teams/models/tc-team-info.model';
import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'tc-member-settings',
  templateUrl: './member-settings.component.html',
  styleUrls: ['./member-settings.component.scss']
})
export class MemberSettingsComponent implements OnInit {
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  memberBasicSettingsGroup: FormGroup;
  changePasswordGroup: FormGroup;
  remindersForm: FormGroup;
  teamNameControl: FormControl;
  allTeams: TcTeamInfo[];
  teamsTheUserIsAdminOf: TcTeamInfo[];
  isEditingTeamName: boolean;
  userEmail: string;
  currentMember: TcMember;
  isSelectAllReminders = false;
  @ViewChild('adminTeamsSelect') adminTeamsSelect;

  constructor(
    private membersService: MembersService,
    private teamsService: TeamsService,
    private fieldValidatorsService: FieldValidatorsService,
    private userService: UserService,
    private loginStatusService: LoginStatusService,
    public dialog: MatDialog
  ) {
    this.allTeams = this.teamsService.userTeams;
    this.teamsTheUserIsAdminOf = this.teamsService.getTeamsTheUserIsAdminOf();
    this.initSettingsForm();
  }

  ngOnInit() {
    this.userEmail = this.userService.username;
    // this.currentMember = {
    //   firstName: this.userService.firstName,
    //   lastName: this.userService.lastName,
    //   mobile: this.userService.mobile
    // }
    // this.membersService.getMember(this.userService.memberId).subscribe(currentMemberInfo => {
    //   this.currentMember = currentMemberInfo;
    //   this.memberBasicSettingsGroup.patchValue(this.currentMember);
    //   this.memberBasicSettingsGroup.markAsUntouched();
    // });

    this.membersService.getReminders().subscribe(remindersInfo => {
      this.remindersForm.patchValue(remindersInfo);
      this.remindersForm.markAsUntouched();
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
    if (this.teamsTheUserIsAdminOf.length) {
      this.createTeamNameFromControl();
    }
    this.createRemindersForm();
  }

  /**
   * @author Nermeen Mattar
   * @description creates the member form group along with its form controls and their validation rules.
   */
  createBasicSettingsForm() {
    this.memberBasicSettingsGroup = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      mobile: new FormControl(null, this.fieldValidatorsService.getValidator('number')),
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
   * @description creates  team name from control.
   */
  createTeamNameFromControl() {
    this.teamNameControl = new FormControl(null, [Validators.required]);
  }

  createRemindersForm() {
    this.remindersForm = new FormGroup({});
    this.allTeams.forEach(team => {
      this.remindersForm.addControl(team.teamId.toString(), new FormControl(null)); // should replace null with a value
    });
  }

  selectAllReminders(selectAllValue) {
    this.isSelectAllReminders = selectAllValue;
    if (selectAllValue) {
      const newValue = this.remindersForm.value;
      Object.keys(newValue).forEach(formControlName => {
        newValue[formControlName] = true;
      });
      this.remindersForm.setValue(newValue);
    }
  }

  /**
   * @author Nermeen Mattar
   * @description sends the new password the user provided as an attempt to change the password
   */
  changePassword() {
    this.membersService.changePassword(this.changePasswordGroup.value).subscribe(successfulyChanged => {
      this.loginStatusService.logout();
    });
  }

  /**
   * @author Nermeen Mattar
   * @description calls the function to update the team name.
   */
  saveTeamName() {
    this.teamsService.changeTeamName(this.teamNameControl.value, this.adminTeamsSelect.value.teamId);
    this.teamNameControl.reset();
  }


  /**
   * @author Nermeen Mattar
   * @description takes the user changes then calls the function to update the member settings.
   */
  saveMemberBasicInfoSettings() {
    if (this.memberBasicSettingsGroup.untouched) {
      return;
    }
    const updatedMemberValue = this.memberBasicSettingsGroup.value;
    Object.keys(updatedMemberValue).forEach(propertyName => {
      this.deletePropertyValueIfNotTouched(propertyName, updatedMemberValue);
    });
    // this.membersService.updateMember(this.userService.memberId, updatedMemberValue).subscribe(res => {
    //   this.memberBasicSettingsGroup.markAsUntouched();
    //   this.currentMember = {
    //     ...this.currentMember,
    //     ...updatedMemberValue
    //   };
    //   Object.keys(updatedMemberValue).forEach(propertyName => {
    //     this.userService[propertyName] = updatedMemberValue[propertyName];
    //   });
    // });
  }

  saveRemindersInfo() {
    this.membersService.setReminders(this.remindersForm.value);
  }

  deletePropertyValueIfNotTouched(propertyName, updatedMemberValue) {
    if (this.memberBasicSettingsGroup.controls[propertyName].untouched) {
      delete updatedMemberValue[propertyName];
    }
  }

  openConfirmationDialog(dialogData): void {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: true,
      data: dialogData
    });
  }

  deleteMyAccount() {
    this.openConfirmationDialog({
      dialogTitle: 'USER.CONFIRM_DELETING_ACCOUNT_HEADER',
      dialogMessage: 'USER.CONFIRM_DELETING_ACCOUNT_BODY'
    });
    this.confirmDialogRef.afterClosed().pipe(
      first()
    ).subscribe(confirmed => {
      if (confirmed) {
        this.membersService.deleteMyAccount().subscribe(res => { });
      }
    });
  }
}
