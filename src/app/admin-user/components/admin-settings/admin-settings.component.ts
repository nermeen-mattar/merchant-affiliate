import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';

import { AdminService } from './../../../core/services/admin.service';
import { FieldValidatorsService } from '../../../core/services/field-validators.service';
import { UserService } from '../../../core/services/user.service';
import { TcTeamInfo } from '../../../teams/models/tc-team-info.model';

@Component({
  selector: 'tc-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {
  selectedTeam: TcTeamInfo;
  adminSettingsGroup: FormGroup;
  teamSettingsGroup: FormGroup;
  teamNameControl: FormControl;
  userTeams: TcTeamInfo[];
  eventId: string; /* is undefined (in the case of event creation) */
  constructor(userService: UserService, private fieldValidatorsService: FieldValidatorsService,
    private adminService: AdminService,
    private route: ActivatedRoute, private router: Router) {
    this.userTeams = userService.getUserTeams();
    this.selectedTeam = userService.getSelectedTeam();
    this.initSettingsForm();
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description calls the funcitons that create 1- the admin form 2- the team name form control 3- the team form.
   */
  initSettingsForm() {
    this.createAdminSettingsForm();
    this.createTeamNameFormControls();
    this.createTeamSettingsForm();
  }

  /**
   * @author Nermeen Mattar
   * @description creates the admin form group along with its form controls and their validation rules.
   */
  createAdminSettingsForm() {
    this.adminSettingsGroup = new FormGroup({
      adminPassword: new FormControl('', [Validators.required]),
      adminNewPassword: new FormControl('', [Validators.required]),
      adminConfirmNewPassword: new FormControl('', [Validators.required])
    }, [this.fieldValidatorsService.getValidator('validateEqual', {
      field1: 'adminNewPassword',
      field2: 'adminConfirmNewPassword'
    })]);
  }

  /**
   * @author Nermeen Mattar
   * @description creates the team name form control (a standalone form control).
   */
  createTeamNameFormControls() {
    this.teamNameControl = new FormControl('', [Validators.required]);
  }

  /**
   * @author Nermeen Mattar
   * @description creates the team form group along with its form controls and their validation rules.
   */
  createTeamSettingsForm() {
    this.teamSettingsGroup = new FormGroup({
      teamPassword: new FormControl('', [Validators.required]),
      teamNewPassword: new FormControl('', [Validators.required]),
      teamConfirmNewPassword: new FormControl('', [Validators.required]),
      // directLink: new FormControl('', [Validators.required])
    });
  }
  /**
   * @author Nermeen Mattar
   * @description takes the user changes then calls the function to update the admin settings.
   */
  saveAdminSettings() {
    this.adminService.changeAdminPassword({
      adminPassword: this.adminSettingsGroup.value.adminPassword,
      adminNewPassword: this.adminSettingsGroup.value.adminNewPassword
    });
  }

  /**
   * @author Nermeen Mattar
   * @description takes the user changes then calls the function to update the team settings.
   */
  saveTeamSettings() {
    this.adminService.changeTeamPassword({
      teamPassword: this.teamSettingsGroup.value.teamPassword,
      teamNewPassword: this.teamSettingsGroup.value.teamNewPassword
    });
  }

  /**
   * @author Nermeen Mattar
   * @description checks if the value of the team name control is valid if valid it calls the function to update the team name.
   */
  saveTeamName() {
    if (this.teamNameControl.valid) {
      this.adminService.changeTeamName(this.teamNameControl.value);
    }
  }
}
