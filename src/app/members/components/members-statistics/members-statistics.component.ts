import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, PageEvent} from '@angular/material';

import { DateService } from './../../../core/services/date.service';
import { TeamsService } from './../../../core/services/teams.service';
import { TcTeamInfo } from '../../../teams/models/tc-team-info.model';
import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MembersStatisticsService } from '../../services/members-statistics.service';

@Component({
  selector: 'tc-members-statistics',
  templateUrl: './members-statistics.component.html',
  styleUrls: ['./members-statistics.component.scss'],
  providers: [MembersStatisticsService]
})

export class MembersStatisticsComponent implements OnInit {
  displayedColumns = ['member', 'email', 'participations', 'cancelations'];
  membersStatisticsDataSource: MatTableDataSource < any > ;
  userTeams: TcTeamInfo[];
  selectedTeamId: number;
  teamMemberId: number;
  filterString: string;
  dateRangeFormGroup: FormGroup = new FormGroup({});
  teamsTheUserIsAdminOf: TcTeamInfo[];
  constructor(private membersStatisticsService: MembersStatisticsService,
    private teamsService: TeamsService, private dateService: DateService) {
    this.teamsTheUserIsAdminOf = this.teamsService.getTeamsTheUserIsAdminOf();
    this.selectedTeamId = this.teamsService.selectedTeamId;
    if (!this.teamsService.hasAdminRole(this.selectedTeamId)) {
      this.selectedTeamId = this.teamsTheUserIsAdminOf[0].teamId;
    }
    this.createDateRangeFormGroup();
    this.dateRangeFormGroup.valueChanges.subscribe(res => this.dateRangeChange());
    this.userTeams = this.teamsService.userTeams;
    this.updateMembersStatistics();
  }

  ngOnInit() {}

  /**
   * @author Nermeen Mattar
   * @description uses the members statistics service to get members' statistics for the selected team during a seleted range then sends the
   * received members to updateMembersStatisticsDataSource function which initializes the membersStatisticsDataSource for the members table
   */
  updateMembersStatistics() {
    this.membersStatisticsDataSource = undefined; // reset data source to display the loader as new data will be received
    this.membersStatisticsService.getMembersStatistics(this.selectedTeamId).subscribe((res) => { // {members= [], myTeamMemberId}
      // this.teamMemberId = myTeamMemberId;
      this.updateMembersStatisticsDataSource(res.teamMembers);
    });
  }

  /**
   * @author Nermeen Mattar
   * @description creates the start date and end date form controls (standalone form controls).
   */
  createDateRangeFormGroup() {
    this.dateRangeFormGroup.addControl('dateFrom', new FormControl(this.dateService.selectedDateRange.dateFrom, [Validators.required]));
    this.dateRangeFormGroup.addControl('dateTo', new FormControl(this.dateService.selectedDateRange.dateTo, [Validators.required]));
  }

  /**
   * @author Nermeen Mattar
   * @description sets the selected date range in the date service and calls update members statistics function
   */
  dateRangeChange() {
    this.dateService.selectedDateRange = this.dateRangeFormGroup.value;
    this.updateMembersStatistics();
  }

  /**
   * @author Nermeen Mattar
   * @description When the user changes the selected team from the menu, it updates the selected team in user service with the newly
   * selected team, and updates the displayed events to displays the events that belongs to the selected team.
   */
  changeSelectedTeam() {
    this.teamsService.selectedTeamId = this.selectedTeamId;
    this.updateMembersStatistics();
  }

  /**
   * @author Nermeen Mattar
   * @description creates a new object of type material table data source and passes to it the members data to be displayed on the table
   * @param {TcMember[]} members
   */
  updateMembersStatisticsDataSource(members) {
    this.filterString = ''; // reset any string the user entered in the search input
    this.membersStatisticsDataSource = new MatTableDataSource(members); // Assign the data to the data source for the table to render
  }

  /**
   * @author Nermeen Mattar
   * @description filters the members list table based on the user's input
   * @param {string} filterValue
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Removes whitespace
    filterValue = filterValue.toLowerCase(); // membersStatisticsDataSource defaults to lowercase matches
    this.membersStatisticsDataSource.filter = filterValue;
  }
}
