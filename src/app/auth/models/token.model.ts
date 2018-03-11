import { TcTeamRoles } from './../../teams/models/tc-team-roles.model';
export interface Token {
  greantedRole: string;
  roles: string[];
  sub: string; /* username/email */
  teamRoles: TcTeamRoles;
}
