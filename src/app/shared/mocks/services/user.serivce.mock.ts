import { TcClientSideTeamRoles } from './../../../teams/models/tc-client-side-team-roles.model';
import { TcTeamInfo } from './../../../teams/models/tc-team-info.model';
export class UserServiceMock {

  constructor() {}

  get username(): string {
    return 'ahsan';
  }
  set username(username: string) {}

  get teamRoles(): TcClientSideTeamRoles {
    return {
      teamAdmins: [1],
      teamMembers: [1]
    };
  }

  set teamRoles(teamRoles) {}

  clearLoggedInUserInfo () {}
}
