import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MatTableDataSource, MatDialog, MatDialogRef} from '@angular/material';
import { DatePipe } from '@angular/common';
import { first } from 'rxjs/operators';

import { MembersService } from '../../services/members.service';
import { TcTeamInfo } from '../../../teams/models/tc-team-info.model';
import { UserService } from '../../../core/services/user.service';
import { TcMember } from '../../models/tc-member.model';
import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'tc-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {
  displayedColumns = ['member', 'mail'];
  membersDataSource: MatTableDataSource < TcMember > ;
  userTeams: TcTeamInfo[];
  selectedTeam: TcTeamInfo;
  teamMemberId: number;
  displayAdminActions: boolean;
  filterString = '';
  confirmDialogRef: MatDialogRef < ConfirmDialogComponent > ;
  constructor(private membersService: MembersService, private userService: UserService, public dialog: MatDialog) {
    this.displayAdminActions = this.userService.getUserType().toLowerCase() === 'admin';
    if (this.displayAdminActions) {
      this.displayedColumns.push('action');
    }
    this.userTeams = this.userService.getUserTeams();
    this.selectedTeam = this.userService.getSelectedTeam();
    this.updateMembers();
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description updates the members variable by using members service to get members for the selected team then sends
   * the received members to initMembersDataSource function which initializes the membersDataSource for the members table
   */
  updateMembers() {
    this.membersDataSource = undefined; // reset data source to display the loader as new data will be received
    this.userService.setSelectedTeam(this.selectedTeam); // *** temp (to enhance)
    this.membersService.getMembers(this.selectedTeam.teamId).subscribe((res) => { // {members= [], myTeamMemberId}
      // this.teamMemberId = myTeamMemberId;
      this.updateMembersDataSource(res);
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
    const updatedFlag: number = member.flag ? 0 : 1;
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
          teamId: this.selectedTeam.teamId,
          teamMemberId: member.id
        }).subscribe(res => {
          this.membersDataSource.data[this.getIndexOfTargetMember(member.id)].flag = updatedFlag;
        });
      }
    });
  }

  /**
   * @author Nermeen Mattar
   * @description creates a new object of type material table data source and passes to it the members data to be displayed on the table
   * @param {TcMember[]} members
   */
  updateMembersDataSource(members: TcMember[]) {
    this.filterString = ''; // reset any string the user entered in the search input
    this.membersDataSource = new MatTableDataSource(members); // Assign the data to the data source for the table to render
    console.log('this.membersDataSource ', this.membersDataSource);
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
