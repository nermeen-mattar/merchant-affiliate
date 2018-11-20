import { TcTeamInfo } from './../../../teams/models/tc-team-info.model';
export class TeamsServiceMock {

  constructor() {}

set selectedTeamId(selectedTeam: number) {}

get selectedTeamId(): number {
  return 1;
}

get userTeams() {
  return [{
    teamId: 1,
    teamName: 'test'
  }];
}

set userTeams(userTeams) {}

}
