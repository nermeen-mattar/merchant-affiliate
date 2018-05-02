export interface ServerSideRegisterInfo{
  teamname: string;
  teampassword: string;
  email: string;
  firstname?: string; /* first name and last name are not required for an existing user */
  lastname?: string;
  adminpassword: string;
}

