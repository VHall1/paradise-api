import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Character } from '../entities/Character';

@InputType()
class NewCharacterInput {
  @Field()
  steam: string;

  @Field()
  name: string;

  @Field()
  surename: string;

  @Field()
  birthdate: string;
}

@Resolver()
export class CharacterResolver {
  @Query(() => Character, { nullable: true })
  character(@Arg('id', () => Int) id: number): Promise<Character | undefined> {
    return Character.findOne(id);
  }

  @Query(() => [Character])
  characters(@Arg('steam') steam: string): Promise<Character[]> {
    return Character.find({ where: { userSteam: steam } });
  }

  @Mutation(() => Character)
  createCharacter(
    @Arg('options') { steam, name, surename, birthdate }: NewCharacterInput
  ): Promise<Character> {
    let phone: string;
    do {
      phone = (Math.floor(Math.random() * 9000000) + 1000000).toString();
    } while (!Character.findOne({ phone }));

    return Character.create({
      userSteam: steam,
      name,
      surename,
      birthdate,
      phone,
    }).save();
  }

  @Mutation(() => [Character])
  async deleteCharacter(
    @Arg('id', () => Int) id: number,
    @Arg('steam') steam: string
  ): Promise<Character[]> {
    await Character.delete({ id, userSteam: steam });
    return Character.find({ where: { userSteam: steam } });
  }
}
