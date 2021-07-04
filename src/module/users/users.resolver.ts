import { ParseIntPipe, UseGuards, Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from './users.service';

const pubSub = new PubSub();

@Resolver('user')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  // @UseGuards(UsersGuard)
  async getUsers() {
    return this.usersService.findAll();
  }

  @Query('user')
  async findOneById(
    @Args('id')
    id: string,
  ): Promise<any> {
    return this.usersService.findOneById(id);
  }

  @Mutation('changeUser')
  async change(@Args('user') args: any): Promise<any> {
    const data = await this.usersService.update(args);
    return data;
  }

  @Mutation('deleteUser')
  async delete(@Args('id') id: string): Promise<any> {
    const data = await this.usersService.delete(id);
    return data;
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') args: any): Promise<any> {
    const createdUser = await this.usersService.create(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
