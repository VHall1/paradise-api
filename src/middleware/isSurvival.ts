import { Survival } from '../entities/Survival';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';

export const isSurvival: MiddlewareFn<MyContext> = async ({ args }, next) => {
  const survival = await Survival.findOne(args?.id);

  if (!survival) {
    await Survival.create({ characterId: args?.id }).save();
  }

  return next();
};
