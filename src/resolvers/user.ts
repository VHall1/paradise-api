import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
} from 'type-graphql';
import { User } from '../entities/User';

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Arg('steam') steam: string): Promise<User | undefined> {
    return User.findOne({ steam });
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Arg('steam') steam: string,
    @Arg('discord') discord: string
  ): Promise<UserResponse> {
    let user;
    try {
      user = await User.create({ steam, discord }).save();
    } catch (error) {
      if (error.detail.includes('already exists')) {
        return {
          errors: [
            {
              field: 'steam',
              message: 'either steam or discord are already taken',
            },
          ],
        };
      }
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async setWhitelisted(
    @Arg('steam') steam: string,
    @Arg('whitelisted') whitelisted: boolean
  ): Promise<UserResponse> {
    const user = await User.findOne({ steam });

    if (!user) {
      return {
        errors: [
          {
            field: 'steam',
            message: "steam doesn't belong to any user",
          },
        ],
      };
    }

    await User.update({ steam }, { whitelisted });

    return { user };
  }

  @Mutation(() => UserResponse)
  async setBanned(
    @Arg('steam') steam: string,
    @Arg('banned') banned: boolean
  ): Promise<UserResponse> {
    const user = await User.findOne({ steam });

    if (!user) {
      return {
        errors: [
          {
            field: 'steam',
            message: "steam doesn't belong to any user",
          },
        ],
      };
    }

    await User.update({ steam }, { banned });

    return { user };
  }

  @Mutation(() => UserResponse)
  async setAdmin(
    @Arg('steam') steam: string,
    @Arg('admin') admin: boolean
  ): Promise<UserResponse> {
    const user = await User.findOne({ steam });

    if (!user) {
      return {
        errors: [
          {
            field: 'steam',
            message: "steam doesn't belong to any user",
          },
        ],
      };
    }

    await User.update({ steam }, { admin });

    return { user };
  }

  @Mutation(() => UserResponse)
  async setPriority(
    @Arg('steam') steam: string,
    @Arg('priority') priority: number
  ): Promise<UserResponse> {
    const user = await User.findOne({ steam });

    if (!user) {
      return {
        errors: [
          {
            field: 'steam',
            message: "steam doesn't belong to any user",
          },
        ],
      };
    }

    await User.update({ steam }, { priority });

    return { user };
  }
}
