interface Token {
  greantedRole: string;
  roles: string[];
  sub: string; // username/email
  teamRoles: {
    teamAdmins: {
      teamId: number,
      teamName: string
    }[],
    teamMembers: {
      teamId: number,
      teamName: string
    }[]
  };
}
