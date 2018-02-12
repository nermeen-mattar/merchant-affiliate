import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  getUsername(): string {
    return localStorage.getItem('username');
  }
  setUsername(username: string): void { // will set it locally too
    localStorage.setItem('username', JSON.stringify(username));
  }
  setTeamRoles(teamRoles): void { // add type (team-role.model.ts)
    localStorage.setItem('teamRoles', JSON.stringify(teamRoles));
  }

}
