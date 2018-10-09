import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamsService } from '../../core/services/teams.service';

const MANAGE_MODES = {
  ADD: 'ADD',
  EDIT: 'EDIT'
};

@Component({
  selector: 'tc-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.scss']
})
export class ManageTeamComponent implements OnInit {
  manageModes = MANAGE_MODES;
  manageMode = MANAGE_MODES.ADD;
  manageTeamForm: FormGroup = new FormGroup({
    teamName: new FormControl('', [Validators.required])
  });
  constructor(private teamsService: TeamsService) {

  }

  ngOnInit() {
  }

  /**
   * @author Ahsan Ayaz
   * @desc Triggers when the form with team name is submitted
   */
  manageFormSubmit(formValue: { teamName: string }) {
    if (this.manageMode === this.manageModes.ADD) {
      this.teamsService.addTeam(formValue.teamName);
    }
  }

}
