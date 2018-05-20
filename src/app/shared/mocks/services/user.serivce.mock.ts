import { TcTeamInfo } from './../../../teams/models/tc-team-info.model';
import { TcTeamRoles } from './../../../teams/models/tc-team-roles.model';
export class UserServiceMock {

  constructor() {}

  get username(): string {
    return 'ahsan';
  }
  set username(username: string) {}
  get userType(): string {
    return 'ADMIN';
  }

  get teamRoles(): TcTeamRoles {
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

  set teamRoles(teamRoles) {}
  get selectedTeam(): TcTeamInfo {
    return {
      teamId: 1,
      teamName: 'test'
    };
  }
  set selectedTeam(selectedTeam: TcTeamInfo) {}
  get userTeams() {
    return [{
      teamId: 1,
      teamName: 'test'
    }];
  }
  set userTeams(userTeams) {}
  clearLoggedInUserInfo () {}
}
