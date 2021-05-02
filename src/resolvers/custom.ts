import { Custom } from '../entities/Custom';
import { Arg, Int, Query, Resolver, Mutation } from 'type-graphql';

@Resolver()
export class CustomResolver {
  @Query(() => Custom, { nullable: true })
  custom(@Arg('id', () => Int) id: number): Promise<Custom | undefined> {
    return Custom.findOne({ characterId: id });
  }

  @Mutation(() => Custom)
  createCustom(
    @Arg('id', () => Int) id: number,
    @Arg('custom') custom: string
  ): Promise<Custom> {
    const customJSON = JSON.parse(custom);

    return Custom.create({
      characterId: id,
      custom: customJSON,
      clothes: customJSON,
    }).save();
  }

  @Mutation(() => Boolean)
  async updateCustom(
    @Arg('id', () => Int) id: number,
    @Arg('custom') custom: string
  ): Promise<Boolean> {
    const customJSON = JSON.parse(custom);

    await Custom.update(
      {
        characterId: id,
      },
      {
        custom: customJSON,
      }
    );

    return true;
  }
}
