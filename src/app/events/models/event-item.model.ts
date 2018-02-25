export interface EventItem {
  id: string;
  type: string;
  date: string; // or start date and end date
  time: string;
  eventName: string;
  status: string;
  criticalValue: string;
  numOfParticipations?: number;
  detailedParticipations?: any; // add type participation
}
