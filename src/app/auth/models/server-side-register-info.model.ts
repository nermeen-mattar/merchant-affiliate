export interface ServerSideRegisterInfo {
  teamname: string;
  email: string;
  firstname ? : string; /* first name and last name are not required for an existing user */
  lastname ? : string;
  password: string;
  isTeamMember: boolean;
  confirmTerms: boolean;
}
