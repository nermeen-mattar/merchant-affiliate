import { TcServerSideTeamRoles } from './../../teams/models/tc-server-side-team-roles.model';
import { TcMember } from '../../members/models/tc-member.model';
export interface LoginResponse {
  token: string;
  member: TcMember;
  isAuthorized: string;
  hasRoles: string[];
  teamRoles: TcServerSideTeamRoles;
}
