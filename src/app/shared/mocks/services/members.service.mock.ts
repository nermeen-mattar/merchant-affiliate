import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { TcMember } from '../../../members/models/tc-member.model';

export class MembersServiceMock {

  constructor() {}

  getMembers(): Observable < TcMember [] > {
    return of([]);
  }
  getMember(memberId: string): Observable < any > {
    return of({});
  }
  createMember(teamId: number, member: TcMember ): Observable < any > { // Member [] there are other info!
    return of({});
  }
  updateMember(memberId: string, teamId: number, member: TcMember ): Observable < any > {
    return of({});
  }
}

