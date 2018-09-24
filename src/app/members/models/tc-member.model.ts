export interface TcMember {
  id?: number; // no id when creating a new event
  firstName: string;
  lastName?: string;
  email?: string;
  mail?: string;
  mobile?: number;
  allowReminders?: boolean;
  active?: number;
  name?: string;
  new?: boolean;
  member?: {
    // mail: string,
    // sessionTeamPassword: string,
    id?: number,
    new: boolean
  };
}
