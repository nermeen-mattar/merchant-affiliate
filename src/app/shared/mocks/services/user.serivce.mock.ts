import { TeamInfo } from './../../../teams/models/team-info.model';
import { TeamRoles } from './../../../teams/models/team-roles.model';
export class UserServiceMock {

  constructor() {}

  getUsername(): string {
    return 'ahsan';
  }
  setUsername(username: string): void {}
  getUserType(): string {
    return 'ADMIN';
  }

  getTeamRoles(): TeamRoles {
    return {
      teamAdmins: [{
        teamId: 1,
        teamName: 'test team'
      }],
      teamMembers: [{
        teamId: 1,
        teamName: 'test team'
      }]
    };
  }

  setTeamRoles(teamRoles): void {}
  getSelectedTeam(): TeamInfo {
    return {
      teamId: 1,
      teamName: 'test'
    };
  }
  setSelectedTeam(selectedTeam: TeamInfo) {}
  getUserTeams() {
    return [{
      teamId: 1,
      teamName: 'test'
    }];
  }
  setUserTeams() {}
}
