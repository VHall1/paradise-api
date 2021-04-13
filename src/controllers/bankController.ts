import { Request, Response } from 'express';
import { Bank } from '../entities/Bank';
import { Character } from '../entities/Character';
import * as yup from 'yup';

export default {
  async read(req: Request, res: Response) {
    const { id } = req.body;

    const schema = yup.object().shape({
      id: yup.number().required(),
    });

    try {
      await schema.validate({ id });
    } catch (error) {
      return res.status(400).json({ error });
    }

    let character: Character;
    try {
      character = await Character.findOneOrFail(id, { relations: ['bank'] });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }

    let bank: Bank;
    if (!character.bank) {
      bank = new Bank();
      await bank.save();

      character.bank = bank;
      await character.save();
    }

    return res.status(200).json({ bank: character.bank });
  },

  async update(req: Request, res: Response) {
    const { id, bank, wallet } = req.body;

    const schema = yup.object().shape({
      id: yup.number().required(),
      bank: yup.number(),
      wallet: yup.number(),
    });

    try {
      await schema.validate({ id, bank, wallet });
    } catch (error) {
      return res.status(400).json({ error });
    }

    let character: Character;
    try {
      character = await Character.findOneOrFail(id, { relations: ['bank'] });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }

    let characterBank: Bank;
    if (!character.bank) {
      characterBank = new Bank();

      character.bank = characterBank;
      await character.save();
    } else characterBank = character.bank;

    try {
      const values = Object.entries({
        bank,
        wallet,
      });

      values.forEach(([key, value]) => {
        if (value === undefined) return;

        // @ts-ignore
        characterBank[key] = value;
      });

      await characterBank.save();
    } catch (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json({ bank: character.bank });
  },
};
