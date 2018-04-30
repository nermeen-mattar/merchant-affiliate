import { TcTeamRoles } from './../../teams/models/tc-team-roles.model';
export interface DecodedToken {
  grantedRole: string;
  roles: string[];
  sub: string; /* username/email */
  teamRoles: TcTeamRoles;
}
