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

      const character = await Character.findOneOrFail(characterId);
      const bank = await Bank.findOneOrFail({ character });

      return res.status(200).json({ wallet: bank.wallet });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }
  },

  async getBank(req: Request, res: Response) {
    const { id } = req.params;
    const characterId = parseInt(id);

    const schema = yup.object().shape({
      characterId: yup.number().required(),
    });

    try {
      await schema.validate({ characterId });

      const character = await Character.findOneOrFail(characterId);
      const bank = await Bank.findOneOrFail({ character });

      return res.status(200).json({ bank: bank.bank });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }
  },

  async withdraw(req: Request, res: Response) {
    const { id, value } = req.body;

    const schema = yup.object().shape({
      id: yup.number().required(),
      value: yup.number().required(),
    });

    try {
      await schema.validate({ id, value });

      const character = await Character.findOneOrFail(id);
      const bank = await Bank.findOneOrFail({ character });

      if (bank.bank >= value) {
        bank.bank - value;
        bank.wallet + value;

        await bank.save();
      } else {
        return res.status(400).json({ error: { name: 'InsufficientBalance' } });
      }

      return res.status(200).json({ bank: bank.bank, wallet: bank.wallet });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }
  },

  async deposit(req: Request, res: Response) {
    const { id, value } = req.body;

    const schema = yup.object().shape({
      id: yup.number().required(),
      value: yup.number().required(),
    });

    try {
      await schema.validate({ id, value });

      const character = await Character.findOneOrFail(id);
      const bank = await Bank.findOneOrFail({ character });

      if (bank.bank >= value) {
        bank.wallet - value;
        bank.bank + value;

        await bank.save();
      } else {
        return res.status(400).json({ error: { name: 'InsufficientBalance' } });
      }

      return res.status(200).json({ bank: bank.bank, wallet: bank.wallet });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }
  },

  async walletTransfer(req: Request, res: Response) {
    const { id, target, value } = req.body;

    const schema = yup.object().shape({
      id: yup.number().required(),
      target: yup.number().required(),
      value: yup.number().required(),
    });

    try {
      await schema.validate({ id, target, value });

      const character = await Character.findOneOrFail(id);
      const targetCharacter = await Character.findOneOrFail(target);

      const bank = await Bank.findOneOrFail({ character });
      const targetBank = await Bank.findOneOrFail({
        character: targetCharacter,
      });

      if (bank.wallet >= value) {
        bank.wallet - value;
        targetBank.wallet + value;

        await bank.save();
        await targetBank.save();
      } else {
        return res.status(400).json({ error: { name: 'InsufficientBalance' } });
      }

      return res.status(200).json({ wallet: bank.wallet });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }
  },

  async bankTransfer(req: Request, res: Response) {
    const { id, target, value } = req.body;

    const schema = yup.object().shape({
      id: yup.number().required(),
      target: yup.number().required(),
      value: yup.number().required(),
    });

    try {
      await schema.validate({ id, target, value });

      const character = await Character.findOneOrFail(id);
      const targetCharacter = await Character.findOneOrFail(target);

      const bank = await Bank.findOneOrFail({ character });
      const targetBank = await Bank.findOneOrFail({
        character: targetCharacter,
      });

      if (bank.bank >= value) {
        bank.bank - value;
        targetBank.bank + value;

        await bank.save();
        await targetBank.save();
      } else {
        return res.status(400).json({ error: { name: 'InsufficientBalance' } });
      }

      return res.status(200).json({ bank: bank.bank });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }
  },

  async walletPay(req: Request, res: Response) {
    const { id, value } = req.body;

    const schema = yup.object().shape({
      id: yup.number().required(),
      value: yup.number().required(),
    });

    try {
      await schema.validate({ id, value });

      const character = await Character.findOneOrFail(id);
      const bank = await Bank.findOneOrFail({ character });

      if (bank.wallet >= value) {
        bank.wallet - value;
        await bank.save();
      } else {
        return res.status(400).json({ error: { name: 'InsufficientBalance' } });
      }

      return res.status(200).json({ wallet: bank.wallet });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }
  },

  async bankPay(req: Request, res: Response) {
    const { id, value } = req.body;

    const schema = yup.object().shape({
      id: yup.number().required(),
      value: yup.number().required(),
    });

    try {
      await schema.validate({ id, value });

      const character = await Character.findOneOrFail(id);

      const bank = await Bank.findOneOrFail({ character });

      if (bank.bank >= value) {
        bank.bank - value;
        await bank.save();
      } else {
        return res.status(400).json({ error: { name: 'InsufficientBalance' } });
      }

      return res.status(200).json({ bank: bank.bank });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }
  },
};
