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
// import { DealApi } from '../../../sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'tc-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
  providers: [MembersService]
})
export class TeamsListComponent implements OnInit {
  displayedColumns = ['teamName', 'teamDescription', 'teamLimit'];
  dealsDataSource: MatTableDataSource < any > ;
  hasAdminRole: boolean;
  filterString = '';
  roles = roles; /* needed to declare a class property to make it available on the component html */
  teamRoles: TcClientSideTeamRoles;
  confirmDialogRef: MatDialogRef < ConfirmDialogComponent > ;
  itemsList;
  constructor(private userService: UserService, private teamsService: TeamsService, private membersService: MembersService,
    public dialog: MatDialog) {
    // this.teamRoles = this.teamsService.teamRoles;
    // this.hasAdminRole = this.teamsService.hasAdminRole();
    // if (this.hasAdminRole) {
    //   this.displayedColumns.push('action');
    // }
    // this.updateTeamsDataSource();
    userService.customersList().subscribe( res   => {
      console.log(res);
      // this.teamsDataSource = new MatTableDataSource(res);

    });
    userService.businessInfo().subscribe( res   => {
      console.log(res);
      // this.teamsDataSource = new MatTableDataSource(res);

    });
    userService.itemsList().subscribe( res   => {
      this.itemsList = res;
      // this.teamsDataSource = new MatTableDataSource(res);

    });

    userService.locationsList().subscribe( locationsList   => {
      locationsList.forEach(location => {

        console.log(location);
        userService.locationSales(location.id).subscribe( sales   => {
          console.log(sales);

        });
      });

    });
  }

  ngOnInit() {
    // this.dealApi.find().subscribe(data => {
    //   this.dealsDataSource = new MatTableDataSource(data);
    // });
  }

  /**
   * @author Nermeen Mattar
   * @description creates a new object of type material table data source and passes to it the teams data to be displayed on the table
   */
  updateTeamsDataSource() {
    this.filterString = '';
    // this.dealsDataSource = new MatTableDataSource(this.teamsService.userTeams);
  }

  /**
   * @author Nermeen Mattar
   * @description adds the admin of a certain team as a member by creating a member using the admin email. Once the backend responds with
   * success the userTeams will be updated locally too. Finally, the view gets updated by updating the table datasource.
   * @param {TcTeamInfo} teamInfo
   */
  addTeamAdminAsMember(teamInfo: TcTeamInfo) {
    this.membersService.createMember(teamInfo.teamId, {email: this.userService.username, firstName: '', lastName: ''}).subscribe( res => {
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