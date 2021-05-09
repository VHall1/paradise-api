import { Bank } from '../entities/Bank';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';

export const isBank: MiddlewareFn<MyContext> = async ({ args }, next) => {
  const bank = await Bank.findOne({ characterId: args?.id });

  if (typeof bank === 'undefined') {
    await Bank.create({ characterId: args?.id }).save();
  }

  return next();
};

export const isBankTransfer: MiddlewareFn<MyContext> = async (
  { args },
  next
) => {
  const bank = await Bank.findOne({ characterId: args?.options.id });
  const bankTarget = await Bank.findOne({ characterId: args?.target });

  if (!bank) {
    await Bank.create({ characterId: args?.options.id }).save();
  }

  if (!bankTarget) {
    await Bank.create({ characterId: args?.target }).save();
  }

  return next();
};
