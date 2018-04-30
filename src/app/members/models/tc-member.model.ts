export interface TcMember {
  id?: number; // no id when creating a new event
  firstname: string;
  lastname: string;
  email?: string;
  flag?: number;
  name?: string;
  new?: boolean;
  member?: {
    mail: string,
    // sessionTeamPassword: string,
    id?: number,
    new: boolean
  };
}
