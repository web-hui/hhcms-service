import * as mongoose from 'mongoose';

export const schemaName = 'users';

export const UsersSchema = new mongoose.Schema({
  name: String,
  age: Number,
  id: String,
});
