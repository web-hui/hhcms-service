import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './module/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/blog'),
    GraphQLModule.forRootAsync({
      useFactory: async () => ({
        typePaths: ['./**/*.graphql'],
        path: '/api/v1',
      }),
    }),
    UsersModule,
  ],
})
export class AppModule {}
