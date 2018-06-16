import { TcClientSideTeamRoles } from './../../models/tc-client-side-team-roles.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef} from '@angular/material';
import { first } from 'rxjs/operators';

import { MembersService } from './../../../members/services/members.service';
import { UserService } from '../../../core/services/user.service';
import { TcTeamInfo } from '../../models/tc-team-info.model';
import { TeamsService } from '../../../core/services/teams.service';
import { roles } from '../../../core/constants/roles.constants';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

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
  teamRoles: TcClientSideTeamRoles;
  confirmDialogRef: MatDialogRef < ConfirmDialogComponent > ;
  constructor(private userService: UserService, private teamsService: TeamsService, private membersService: MembersService,
    public dialog: MatDialog) {
    this.displayAdminActions = this.userService.userType === roles.admin;
    this.teamRoles = this.teamsService.teamRoles;
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
      this.teamsService.addMemberRole(teamInfo.teamId);
      this.updateTeamsDataSource();
    });
  }

  /**
   * @author Nermeen Mattar
   * @description deletes the target team from the teams list (only allowed for admin)
   * @param {number} memberId
   */
  deleteTeam(teamId: number) { // to be implemented once supported from the backend side
    this.openConfirmationDialog();
    this.confirmDialogRef.afterClosed().pipe(
      first()
    ).subscribe(confirmed => {
      if (confirmed) {
        this.teamsService.deleteTeam(teamId).subscribe(res => {
          this.updateTeamsDataSource();
        });
      }
    });
  }

  openConfirmationDialog(): void {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: true,
      data: {
        dialogTitle: 'USER_MESSAGES.TEAM.TEAM_CONFIRM_DELETING_HEADER',
        dialogMessage: 'USER_MESSAGES.TEAM.TEAM_CONFIRM_DELETING_BODY'
      }
    });
  }
}
