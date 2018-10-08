import { TcServerSideTeamRoles } from '../../teams/models/tc-server-side-team-roles.model';
export interface DecodedToken {
  roles: string[];
  sub: string; /* username/email */
  teamRoles: TcServerSideTeamRoles;
  memberId: number;
  firstName: string;
  lastName: string;
  mobile?: number;
}
