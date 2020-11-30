import TShirtSize from './TShirtSize';

export default interface Clothing {
  _id: string;
  ref: string;
  name: string;
  sizes: TShirtSize[];
  image?: string;
  price: number;
}
