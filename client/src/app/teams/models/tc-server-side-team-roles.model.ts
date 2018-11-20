import { TcTeamInfo } from './tc-team-info.model';
export interface TcServerSideTeamRoles {
  teamAdmins?: TcTeamInfo[];
  teamMembers?: TcTeamInfo[];
}
