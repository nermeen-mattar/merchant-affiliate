import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef} from '@angular/material';
import { first } from 'rxjs/operators';

import { TeamsService } from './../../../core/services/teams.service';
import { MembersService } from '../../services/members.service';
import { TcTeamInfo } from '../../../teams/models/tc-team-info.model';
import { TcMember } from '../../models/tc-member.model';
import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DealApi, BusinessApi } from '../../../sdk';

@Component({
  selector: 'tc-customers-gift',
  templateUrl: './customers-gift.component.html',
  styleUrls: ['./customers-gift.component.scss']
})
export class CustomersGiftComponent implements OnInit {
  memberColumns = ['member', 'mail'];
  adminColumns = ['member', 'mail', 'action'];
  displayedColumns = ['name', 'description', 'limit', 'src_business', 'action'];
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
  businessInfo;
  deals = [];
  dealsDataSource;
  businessList = [];
  defaultBusinessName: string;
  disableBusinessFilter = false;
  constructor(private membersService: MembersService, private teamsService: TeamsService,
    private userService: UserService,
    public dialog: MatDialog, private dealApi: DealApi, private businessApi: BusinessApi) {
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

  ngOnInit() {
    this.businessInfo = localStorage.getItem('business');
    // this.dealApi.find({ where: {src_business: {id: { neq: this.businessInfo['id']} }}}).subscribe( data => {
    this.getDealsList();

    this.businessApi.find({ fields: {id: true, name: true, image: true} }).subscribe(data => {
      this.businessList = data;
    });
    const myBusinessObj = JSON.parse(localStorage.getItem('business'));
    console.log('busObj    ', myBusinessObj);
    this.defaultBusinessName = myBusinessObj.name;
  }


  getDealsList() {
    this.dealApi.find().subscribe( (data: any) => {
      this.deals = data;
      this.updateDealist('Opened');
    });
  }

  updateDealist(status) {
    let copyDealsList = Object.assign([], this.deals);
    if (status === 'Opened') {
      this.disableBusinessFilter = false;
      copyDealsList = copyDealsList.filter(deal => !deal.target_businesses || (Number(deal.limit) > deal.target_businesses.length));
    } else if (status === 'Closed') {
      this.disableBusinessFilter = true;
      copyDealsList = copyDealsList.filter(deal => deal.target_businesses && (Number(deal.limit) === deal.target_businesses.length));
    }
    this.updateMembersDataSource(copyDealsList);
  }

  onFilterBusinessChange(event) {
    console.log(event);
    const businessName = event.value;
    let copyDealsList = Object.assign([], this.deals);
    copyDealsList = copyDealsList.filter(deal => deal.src_business && deal.src_business.name === businessName);

    this.updateMembersDataSource(copyDealsList);
  }


  onFilterTypeChange(event) {
    console.log(event.value);
    this.updateDealist(event.value);
  }

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
    // if (this.hasAdminRole) {
    //   this.displayedColumns = this.adminColumns;
    // } else {
    //   this.displayedColumns = this.memberColumns;
    // }
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
  updateMembersDataSource(members) {
    this.filterString = ''; // reset any string the user entered in the search input
    this.dealsDataSource = new MatTableDataSource(members); // Assign the data to the data source for the table to render
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


  takeDeal(dealId) {
    const targetDeal = this.deals.filter(deal => deal.id === dealId)[0];
    if (!targetDeal.target_businesses) {
      targetDeal.target_businesses = [this.userService.business];
    } else {
      targetDeal.target_businesses.push(this.userService.business);
    }
    // update deal with targetDeal on success -> this.updateDealsList()
    this.dealApi.patchAttributes(dealId, targetDeal).subscribe( res => {
      this.getDealsList();
    });
  }
}
