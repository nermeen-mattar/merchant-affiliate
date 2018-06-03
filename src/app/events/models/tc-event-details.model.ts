import { TcMember } from './../../members/models/tc-member.model';
import { TcEvent } from './tc-event.model';

export interface TcEventDetails extends TcEvent {
  absent: TcMember[];
  presnet: TcMember[];
}

