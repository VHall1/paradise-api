import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../entities/User';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Arg('steam') steam: string): Promise<User | undefined> {
    return User.findOne({ steam });
  }

  @Mutation(() => User, { nullable: true })
  async createUser(
    @Arg('steam') steam: string,
    @Arg('discord') discord: string
  ): Promise<User | undefined> {
    return User.create({ steam, discord }).save();
  }
}
