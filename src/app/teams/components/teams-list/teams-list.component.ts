import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';

import { MembersService } from './../../../members/services/members.service';
import { UserService } from '../../../core/services/user.service';
import { TcTeamInfo } from '../../models/tc-team-info.model';
import { TeamsService } from '../../../core/services/teams.service';
import { roles } from '../../../core/constants/roles.constants';

@Component({
  selector: 'tc-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
  providers: [MembersService]
})
export class TeamsListComponent implements OnInit {
  displayedColumns = ['teamName', 'roles'];
  teamsDataSource: MatTableDataSource < TcTeamInfo > ;
  displayAdminActions: boolean;
  filterString = '';
  roles = roles; /* needed to declare a class property to make it available on the component html */
  constructor(private userService: UserService, private teamsService: TeamsService, private membersService: MembersService) {
    this.displayAdminActions = this.userService.userType === roles.admin;
    if (this.displayAdminActions) {
      this.displayedColumns.push('action');
    }
    this.updateTeamsDataSource();
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description creates a new object of type material table data source and passes to it the teams data to be displayed on the table
   */
  updateTeamsDataSource() {
    this.filterString = '';
    this.teamsDataSource = new MatTableDataSource(this.teamsService.userTeams);
  }

  /**
   * @author Nermeen Mattar
   * @description adds the admin of a certain team as a member by creating a member using the admin email. Once the backend responds with
   * success the userTeams will be updated locally too. Finally, the view gets updated by updating the table datasource.
   * @param {TcTeamInfo} teamInfo
   */
  addTeamAdminAsMember(teamInfo: TcTeamInfo) {
    this.membersService.createMember(teamInfo.teamId, {email: this.userService.username, firstname: '', lastname: ''}).subscribe( res => {
      this.teamsService.addTeamRole(teamInfo.teamId, roles.member);
      this.updateTeamsDataSource();
    });
  }

  /**
   * @author Nermeen Mattar
   * @description deletes the target team from the teams list (only allowed for admin)
   * @param {number} memberId
   */
  deleteTeam(teamId: number) { // to be implemented once supported from the backend side
  }
}
