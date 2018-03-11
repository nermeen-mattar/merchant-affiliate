import { TcTeamInfo } from './../../../teams/models/tc-team-info.model';
import { TcTeamRoles } from './../../../teams/models/tc-team-roles.model';
export class UserServiceMock {

  constructor() {}

  getUsername(): string {
    return 'ahsan';
  }
  setUsername(username: string): void {}
  getUserType(): string {
    return 'ADMIN';
  }

  getTeamRoles(): TcTeamRoles {
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
  getSelectedTeam(): TcTeamInfo {
    return {
      teamId: 1,
      teamName: 'test'
    };
  }
  setSelectedTeam(selectedTeam: TcTeamInfo) {}
  getUserTeams() {
    return [{
      teamId: 1,
      teamName: 'test'
    }];
  }
  setUserTeams() {}
}
