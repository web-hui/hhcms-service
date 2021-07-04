import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { schemaName, UsersSchema } from './schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: schemaName, schema: UsersSchema }]),
  ],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
