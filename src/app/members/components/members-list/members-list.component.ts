import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef} from '@angular/material';
import { first } from 'rxjs/operators';

import { TeamsService } from './../../../core/services/teams.service';
import { MembersService } from '../../services/members.service';
import { TcTeamInfo } from '../../../teams/models/tc-team-info.model';
import { TcMember } from '../../models/tc-member.model';
import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'tc-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {
  memberColumns = ['member', 'mail'];
  adminColumns = ['member', 'mail', 'action'];
  displayedColumns: string[];
  membersDataSource: MatTableDataSource < TcMember > ;
  userTeams: TcTeamInfo[];
  selectedTeamId: number;
  teamMemberId: number;
  hasAdminRole: boolean;
  filterString = '';
  confirmDialogRef: MatDialogRef < ConfirmDialogComponent > ;
  spinner: boolean;
  isTeamAdmin: boolean;
  isTeamMember: boolean;
  constructor(private membersService: MembersService, private teamsService: TeamsService,
    public dialog: MatDialog) {
    this.spinner = true;
    this.userTeams = this.teamsService.userTeams;
    this.selectedTeamId = this.teamsService.selectedTeamId;
    this.isTeamMember = this.teamsService.hasMemberRole(this.selectedTeamId);
    this.isTeamAdmin = this.teamsService.hasAdminRole(this.selectedTeamId);
    if (this.isTeamMember || this.isTeamAdmin) {
      this.updateMembers();
    }
    this.spinner = false;
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description updates the members variable by using members service to get members for the selected team then sends
   * the received members to initMembersDataSource function which initializes the membersDataSource for the members table
   */
  updateMembers() {
    this.membersDataSource = undefined; // reset data source to display the loader as new data will be received
    this.teamsService.selectedTeamId = this.selectedTeamId; // temp (to enhance)
    this.hideOrDisplayAdminActions();
    this.membersService.getMembers(this.selectedTeamId).subscribe((res) => { // {members= [], myTeamMemberId}
      // this.teamMemberId = myTeamMemberId;
      this.updateMembersDataSource(res);
    });
  }

  /**
   * @author Nermeen Mattar
   * @desc checks if the user is an admin of the currently selected team and changes the displayed columns accordingly
   */
  hideOrDisplayAdminActions() {
    this.hasAdminRole = this.teamsService.hasAdminRole(this.selectedTeamId);
    if (this.hasAdminRole) {
      this.displayedColumns = this.adminColumns;
    } else {
      this.displayedColumns = this.memberColumns;
    }
  }

  /**
   * @author Ahsan Ayaz
   * @desc Makes the specified user an admin using the member id
   */
  makeAdmin(user) {
    this.membersService.makeAdmin(user.member.id, user.team.id).subscribe(res => {
      const index  = this.getIndexOfTargetMember(user.id);
      this.membersDataSource.data[index]['isAdmin'] = true;
      this.triggerTableToRefreshData();
    });
  }

  getIndexOfTargetMember(memberId: number) {
    return this.membersDataSource.data.findIndex(member => member.id === memberId);
  }

  triggerTableToRefreshData() {
    this.filterString = ''; // reset any string the user entered in the search input
    this.membersDataSource.data = this.membersDataSource.data; // to trigger the table to change its data.
  }

  /**
   * @author Nermeen Mattar
   * @description deletes the target member from the members list (only allowed for admin)
   * @param {number} memberId
   */
  deleteMember(memberId: number) {
    this.openConfirmationDialog({
      dialogTitle: 'USER_MESSAGES.MEMBER.MEMBER_CONFIRM_DELETING_HEADER',
        dialogMessage: 'USER_MESSAGES.MEMBER.MEMBER_CONFIRM_DELETING_BODY'
    });
    this.confirmDialogRef.afterClosed().pipe(
      first()
    ).subscribe(confirmed => {
      if (confirmed) {
        this.membersService.deleteMember(memberId).subscribe(res => {
          this.membersDataSource.data.splice(this.getIndexOfTargetMember(memberId), 1);
          this.triggerTableToRefreshData();
        });
      }
    });
  }

  openConfirmationDialog(dialogData): void {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: true,
      data: dialogData
    });
  }

  /**
   * @author Nermeen Mattar
   * @description changes the member activtaion status by first toggling current activation status then sending this data to the members
   * service. Once the data is sent to the backend successfuly, the subscription callback changes the data on the client side accordingaly.
   * @param {TcMember} member
   */
  changeMemberActivationStatus(member: TcMember) {
    const updatedFlag: number = member.active ? 0 : 1;
    const ativationMessages = {
      dialogTitle: 'USER_MESSAGES.MEMBER.MEMBER_CONFIRM_ACTIVATE_HEADER',
      dialogMessage: 'USER_MESSAGES.MEMBER.MEMBER_CONFIRM_ACTIVATE_BODY'
    };
    const deativationMessages = {
      dialogTitle: 'USER_MESSAGES.MEMBER.MEMBER_CONFIRM_DEACTIVATE_HEADER',
      dialogMessage: 'USER_MESSAGES.MEMBER.MEMBER_CONFIRM_DEACTIVATE_BODY'
    };
    this.openConfirmationDialog( updatedFlag ? ativationMessages : deativationMessages);
    this.confirmDialogRef.afterClosed().pipe(
      first()
    ).subscribe(confirmed => {
      if (confirmed) {
        this.membersService.changeMemberActivationStatus({
          flag: updatedFlag,
          /* backend expects number */
          teamId: this.selectedTeamId,
          teamMemberId: member.id
        }).subscribe(res => {
          this.membersDataSource.data[this.getIndexOfTargetMember(member.id)].active = updatedFlag;
        });
      }
    });
  }

  /**
   * @author Nermeen Mattar
   * @description sends a request to resend the invitation link to the member with the passed id.
   * @param  {string} memberMail
   */
  resedInvitationLink(teamMemberId: number) {
    this.membersService.resendInvitation(teamMemberId).subscribe(res => res);
  }

  /**
   * @author Nermeen Mattar
   * @description creates a new object of type material table data source and passes to it the members data to be displayed on the table
   * @param {TcMember[]} members
   */
  updateMembersDataSource(members: TcMember[]) {
    this.filterString = ''; // reset any string the user entered in the search input
    this.membersDataSource = new MatTableDataSource(members); // Assign the data to the data source for the table to render
  }

  /**
   * @author Nermeen Mattar
   * @description filters the members list table based on the user's input
   * @param {string} filterValue
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Removes whitespace
    filterValue = filterValue.toLowerCase(); // membersDataSource defaults to lowercase matches
    this.membersDataSource.filter = filterValue;
  }
}
