import { TcServerSideTeamRoles } from './../../teams/models/tc-server-side-team-roles.model';
export interface LoginResponse {
  token: string;
  isAuthorized: string;
  hasRoles: string[];
  teamRoles: TcServerSideTeamRoles;
}
