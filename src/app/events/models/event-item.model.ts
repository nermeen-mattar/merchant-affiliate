export interface EventItem {
  id?: string; // no id when creating a new event
  type: number;
  // time: string;
  eventName: string;
  status?: string; // needed in events list requests, but not in event form requests
  criticalValue: number;
  numOfParticipations?: number;
  detailedParticipations?: any; // add type participation
  comment?: string; // not mandatory
  location?: string; // needed in events form requests, but not in event list requests
  startTime: string;
  endTime: string;
  date: string;
}
