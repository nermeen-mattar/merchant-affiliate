import { TcServerSideTeamRoles } from '../../teams/models/tc-server-side-team-roles.model';
export interface DecodedToken {
  grantedRole: string;
  roles: string[];
  sub: string; /* username/email */
  teamRoles: TcServerSideTeamRoles;
}
