import { TeamRoles } from './../../../teams/models/team-roles.model';
export class UserServiceMock {

  constructor() { }

  getUsername(): string {
    return 'ahsan';
  }

  getUserType(): string {
    return 'ADMIN';
  }

  getTeamRoles(): TeamRoles {
    return   {teamAdmins: [{teamId: 1, teamName: 'test team'}] , teamMembers: [{teamId: 1, teamName: 'test team'}]};
  }

  setUsername(username: string): void {
  }

  setTeamRoles(teamRoles): void {
  }

}


/*  teamId: number;
  teamName: string;
}*/
