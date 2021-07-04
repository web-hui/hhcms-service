import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { schemaName } from './schemas/users.schema';
import { UsersDocument } from './interface/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(schemaName) private userModel: Model<UsersDocument>,
  ) {}

  create(user: UsersDocument): Promise<UsersDocument> {
    const createdCat = new this.userModel(user);
    return createdCat.save();
  }

  findAll(): Promise<UsersDocument[]> {
    return this.userModel.find().exec();
  }

  findOneById(id: string): any {
    return this.userModel.findById(id);
  }

  public update(user: Partial<UsersDocument>) {
    return this.userModel.findOneAndUpdate({ _id: user.id }, user, {
      new: true,
    });
  }

  public delete(_id: string) {
    return this.userModel.findOneAndRemove({ _id });
  }
}
