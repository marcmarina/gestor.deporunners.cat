export default interface Event {
  _id: string;
  name: string;
  description: string;
  dateTime: Date;
  coordinates: string;
  members: string[];
}
