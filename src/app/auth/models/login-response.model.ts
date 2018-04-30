import { TcTeamRoles } from './../../teams/models/tc-team-roles.model';
export interface LoginResponse {
  token: string;
  isAuthorized: string;
  hasRoles: string[];
  teamRoles: TcTeamRoles;
}
