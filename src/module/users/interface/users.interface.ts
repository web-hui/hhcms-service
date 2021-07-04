import { Document } from 'mongoose';

export interface UsersDocument extends Document {
  name: string;
  age: number;
  id: string;
}
