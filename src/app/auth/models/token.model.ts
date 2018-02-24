import { TeamRoles } from './../../teams/models/team-roles.model';
export interface Token {
  greantedRole: string;
  roles: string[];
  sub: string; /* username/email */
  teamRoles: TeamRoles;
}
