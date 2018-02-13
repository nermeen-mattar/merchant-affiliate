import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  // TODO[nermeen]: add method level comment
  getUsername(): string {
    return localStorage.getItem('username');
  }

  // TODO[nermeen]: add method level comment
  setUsername(username: string): void { // will set it locally too
    localStorage.setItem('username', JSON.stringify(username));
  }

  // TODO[nermeen]: add method level comment
  setTeamRoles(teamRoles): void { // add type (team-role.model.ts)
    localStorage.setItem('teamRoles', JSON.stringify(teamRoles));
  }

}
