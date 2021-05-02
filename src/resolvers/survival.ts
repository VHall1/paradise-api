import { isSurvival } from '../middleware/isSurvival';
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Survival } from '../entities/Survival';

@InputType()
class SurvivalInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  value: number;
}

@Resolver()
export class SurvivalResolver {
  @Query(() => Survival, { nullable: true })
  @UseMiddleware(isSurvival)
  survival(@Arg('id') id: number): Promise<Survival | undefined> {
    return Survival.findOne(id);
  }

  @Mutation(() => Boolean)
  async updateHealth(
    @Arg('options') { id, value }: SurvivalInput
  ): Promise<Boolean> {
    await Survival.update(
      {
        characterId: id,
      },
      {
        health: value,
      }
    );

    return true;
  }

  @Mutation(() => Boolean)
  async updateArmour(
    @Arg('options') { id, value }: SurvivalInput
  ): Promise<Boolean> {
    await Survival.update(
      {
        characterId: id,
      },
      {
        armour: value,
      }
    );

    return true;
  }

  @Mutation(() => Boolean)
  async updateCoords(
    @Arg('id', () => Int) id: number,
    @Arg('coords') coords: string
  ): Promise<Boolean> {
    const coordsObject = JSON.parse(coords);

    await Survival.update(
      {
        characterId: id,
      },
      {
        lastCoords: coordsObject,
      }
    );

    return true;
  }
}
