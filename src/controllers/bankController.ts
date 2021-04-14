import { Request, Response } from 'express';
import { Bank } from '../entities/Bank';
import { Character } from '../entities/Character';
import * as yup from 'yup';

export default {
  async getWallet(req: Request, res: Response) {
    const { id } = req.params;
    const characterId = parseInt(id);

    const schema = yup.object().shape({
      characterId: yup.number().required(),
    });

    try {
      await schema.validate({ characterId });
    } catch (error) {
      return res.status(400).json({ error });
    }

    let character: Character;
    try {
      character = await Character.findOneOrFail(characterId);
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }

    let wallet: number;
    let bank = await Bank.findOne({ character });

    if (!bank) {
      try {
        bank = new Bank();
        bank.character = character;

        await bank.save();
      } catch (error) {
        return res.status(400).json({ error });
      }
    }

    wallet = bank.wallet;

    return res.status(200).json({ wallet });
  },

  async getBank(req: Request, res: Response) {
    const { id } = req.params;
    const characterId = parseInt(id);

    const schema = yup.object().shape({
      characterId: yup.number().required(),
    });

    try {
      await schema.validate({ characterId });
    } catch (error) {
      return res.status(400).json({ error });
    }

    let character: Character;
    try {
      character = await Character.findOneOrFail(characterId);
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }

    let bank = await Bank.findOne({ character });

    if (!bank) {
      try {
        bank = new Bank();
        bank.character = character;

        await bank.save();
      } catch (error) {
        return res.status(400).json({ error });
      }
    }

    return res.status(200).json({ bank: bank.bank });
  },

  // async update(req: Request, res: Response) {
  //   const { id, bank, wallet } = req.body;

  //   const schema = yup.object().shape({
  //     id: yup.number().required(),
  //     bank: yup.number(),
  //     wallet: yup.number(),
  //   });

  //   try {
  //     await schema.validate({ id, bank, wallet });
  //   } catch (error) {
  //     return res.status(400).json({ error });
  //   }

  //   let character: Character;
  //   try {
  //     character = await Character.findOneOrFail(id, { relations: ['bank'] });
  //   } catch (error) {
  //     if (error.name === 'EntityNotFound')
  //       return res.status(404).json({ error });

  //     return res.status(400).json({ error });
  //   }

  //   let characterBank: Bank;
  //   if (!character.bank) {
  //     characterBank = new Bank();

  //     character.bank = characterBank;
  //     await character.save();
  //   } else characterBank = character.bank;

  //   try {
  //     const values = Object.entries({
  //       bank,
  //       wallet,
  //     });

  //     values.forEach(([key, value]) => {
  //       if (value === undefined) return;

  //       // @ts-ignore
  //       characterBank[key] = value;
  //     });

  //     await characterBank.save();
  //   } catch (error) {
  //     return res.status(500).json({ error });
  //   }

  //   return res.status(200).json({ bank: character.bank });
  // },
};
