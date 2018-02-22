import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  /**
   * @author Nermeen Mattar
   * @description gets the username/email from the local storage
   * @returns {string}
   */
  getUsername(): string {
    return JSON.parse(localStorage.getItem('username'));
  }
  /**
   * @author Nermeen Mattar
   * @description sets the username/email to the local storage
   * @param username
   */
  setUsername(username: string): void { // will set it locally too
    localStorage.setItem('username', JSON.stringify(username));
  }

  /**
   * @author Nermeen Mattar
   * @description sets the team roles to the local storage
   * @param username
   */
  setTeamRoles(teamRoles): void { // add type (team-role.model.ts)
    localStorage.setItem('teamRoles', JSON.stringify(teamRoles));
  }

}
