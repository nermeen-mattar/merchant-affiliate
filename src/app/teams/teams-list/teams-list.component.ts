import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';

import { UserService } from './../../core/services/user.service';
import { TcTeamInfo } from '../models/tc-team-info.model';

@Component({
  selector: 'tc-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {
  displayedColumns = ['teamName', 'roles'];
  teamsDataSource: MatTableDataSource < TcTeamInfo > ;
  displayAdminActions: boolean;
  filterString = '';

  constructor(private userService: UserService) {
    this.displayAdminActions = this.userService.getUserType().toLowerCase() === 'admin';
    if (this.displayAdminActions) {
      this.displayedColumns.push('action');
    }
    this.updateTeamsDataSource(this.userService.getUserTeams());
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description creates a new object of type material table data source and passes to it the teams data to be displayed on the table
   * @param {TcTeam[]} teams
   */
  updateTeamsDataSource(teams: TcTeamInfo[]) {
    this.filterString = ''; // reset any string the user entered in the search input
    this.teamsDataSource = new MatTableDataSource(teams); // Assign the data to the data source for the table to render
  }
}
