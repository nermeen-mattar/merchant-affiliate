import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';

import { UserService } from './../../../core/services/user.service';
import { TeamsService } from './../../../core/services/teams.service';
import { AdminService } from './../../../core/services/admin.service';
import { FieldValidatorsService } from '../../../core/services/field-validators.service';
import { TcTeamInfo } from '../../../teams/models/tc-team-info.model';
@Component({
  selector: 'tc-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {
  adminSettingsGroup: FormGroup;
  teamSettingsGroup: FormGroup;
  teamNameControl: FormControl;
  directLinkControl: FormControl;
  selectedTeamInfo: TcTeamInfo;
  teamsTheUserIsAdminOf: TcTeamInfo[];
  constructor(private fieldValidatorsService: FieldValidatorsService,
    private adminService: AdminService, private teamsService: TeamsService,
    private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.updateTeamsTheUserIsAdminOf();
    this.selectedTeamInfo = this.teamsTheUserIsAdminOf[0];
    this.initSettingsForm();
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description filters the teams list to get only the teams that the user is admin of and sets this value in the teamsTheUserIsAdminOf.
   */
  updateTeamsTheUserIsAdminOf() {
    this.teamsTheUserIsAdminOf =
     this.teamsService.userTeams.filter( team => this.userService.teamRoles.teamAdmins.indexOf(team.teamId) !== -1);
  }

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
   * @description calls the funcitons that create 1- the admin form 2- the team name form control 3- the team form.
   */
  initSettingsForm() {
    this.createAdminSettingsForm();
    this.createTeamNameAndDirectLinkFormControls();
    this.createTeamSettingsForm();
  }

  /**
   * @author Nermeen Mattar
   * @description creates the admin form group along with its form controls and their validation rules.
   */
  createAdminSettingsForm() {
    this.adminSettingsGroup = new FormGroup({
      adminPassword: new FormControl('', [Validators.required]),
      adminNewPassword: new FormControl('', [Validators.required,
        this.fieldValidatorsService.getValidator('validatePassword')
      ]),
      adminConfirmNewPassword: new FormControl('', [Validators.required])
    }, [this.fieldValidatorsService.getValidator('validateEqual', {
      field1: 'adminNewPassword',
      field2: 'adminConfirmNewPassword'
    })]);
  }

  /**
   * @author Nermeen Mattar
   * @description creates the team name and direct link form controls (standalone form controls).
   */
  createTeamNameAndDirectLinkFormControls() {
    this.teamNameControl = new FormControl('', [Validators.required]);
    this.directLinkControl = new FormControl('');
  }

  /**
   * @author Nermeen Mattar
   * @description creates the team form group along with its form controls and their validation rules.
   */
  createTeamSettingsForm() {
    this.teamSettingsGroup = new FormGroup({
      teamPassword: new FormControl('', [Validators.required]),
      teamNewPassword: new FormControl('', [Validators.required,
        this.fieldValidatorsService.getValidator('validatePassword')
      ]),
      teamConfirmNewPassword: new FormControl('', [Validators.required]),
    }, [this.fieldValidatorsService.getValidator('validateEqual', {
      field1: 'teamNewPassword',
      field2: 'teamConfirmNewPassword'
    })]);
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
      this.updateTeamsTheUserIsAdminOf();
    }
  }

  /**
   * @author Nermeen Mattar
   * @description gets a new direct link and displays it in the direct link form control
   */
  generateDirectLink() {
    this.adminService.changeDirectLink().subscribe(res => {
      this.directLinkControl.setValue(res.directlink);
    });
  }
}
