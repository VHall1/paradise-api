import { Bank } from '../entities/Bank';
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { isBank, isBankTransfer } from '../middleware/isBank';

@InputType()
class SelfTransfer {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  value: number;
}

@ObjectType()
class BankResponse {
  @Field()
  success: boolean;

  @Field()
  message?: string;
}

@Resolver()
export class BankResolver {
  @Query(() => Bank, { nullable: true })
  @UseMiddleware(isBank)
  bank(@Arg('id', () => Int) id: number): Promise<Bank | undefined> {
    return Bank.findOne({ characterId: id });
  }

  @Mutation(() => BankResponse)
  @UseMiddleware(isBank)
  async deposit(
    @Arg('options') { id, value }: SelfTransfer
  ): Promise<BankResponse> {
    const bank = await Bank.findOne({ characterId: id });

    if (!bank) return { success: false };

    if (bank.wallet - value < 0)
      return { success: false, message: 'Insufficient funds' };

    await Bank.update(
      { id: bank.id },
      {
        wallet: bank.wallet - value,
        bank: bank.bank + value,
      }
    );

    return { success: true };
  }

  @Mutation(() => BankResponse)
  @UseMiddleware(isBank)
  async withdraw(
    @Arg('options') { id, value }: SelfTransfer
  ): Promise<BankResponse> {
    const bank = await Bank.findOne({ characterId: id });

    if (!bank) return { success: false };

    if (bank.bank - value < 0)
      return { success: false, message: 'Insufficient funds' };

    await Bank.update(
      { id: bank.id },
      {
        wallet: bank.wallet + value,
        bank: bank.bank - value,
      }
    );

    return { success: true };
  }

  @Mutation(() => BankResponse)
  @UseMiddleware(isBankTransfer)
  async transferWallet(
    @Arg('options') { id, value }: SelfTransfer,
    @Arg('target', () => Int) target: number
  ): Promise<BankResponse> {
    const bank = await Bank.findOne({ characterId: id });
    const bankTarget = await Bank.findOne({ characterId: target });

    if (!bank || !bankTarget) return { success: false };

    if (bank.wallet - value < 0)
      return { success: false, message: 'Insufficient funds' };

    await Bank.update({ id: bank.id }, { wallet: bank.wallet - value });
    await Bank.update(
      { id: bankTarget.id },
      { wallet: bankTarget.wallet + value }
    );

    return { success: true };
  }

  @Mutation(() => BankResponse)
  @UseMiddleware(isBankTransfer)
  async transferBank(
    @Arg('options') { id, value }: SelfTransfer,
    @Arg('target', () => Int) target: number
  ): Promise<BankResponse> {
    const bank = await Bank.findOne({ characterId: id });
    const bankTarget = await Bank.findOne({ characterId: target });

    if (!bank || !bankTarget) return { success: false };

    if (bank.bank - value < 0)
      return { success: false, message: 'Insufficient funds' };

    await Bank.update({ id: bank.id }, { bank: bank.bank - value });
    await Bank.update({ id: bankTarget.id }, { bank: bankTarget.bank + value });

    return { success: true };
  }

  @Mutation(() => BankResponse)
  @UseMiddleware(isBank)
  async payWallet(
    @Arg('options') { id, value }: SelfTransfer
  ): Promise<BankResponse> {
    const bank = await Bank.findOne({ characterId: id });

    if (!bank)
      return {
        success: false,
      };

    if (bank.wallet - value < 0)
      return { success: false, message: 'Insufficient funds' };

    await Bank.update({ id: bank.id }, { wallet: bank.wallet - value });

    return { success: true };
  }

  @Mutation(() => BankResponse)
  @UseMiddleware(isBank)
  async payBank(
    @Arg('options') { id, value }: SelfTransfer
  ): Promise<BankResponse> {
    const bank = await Bank.findOne({ characterId: id });

    if (!bank)
      return {
        success: false,
      };

    if (bank.bank - value < 0)
      return { success: false, message: 'Insufficient funds' };

    await Bank.update({ id: bank.id }, { bank: bank.bank - value });

    return { success: true };
  }
}
