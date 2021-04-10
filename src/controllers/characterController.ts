import { Request, Response } from 'express';
import { User } from '../entities/User';
import { Character } from '../entities/Character';
import * as yup from 'yup';

export default {
  async create(req: Request, res: Response) {
    const { steam, name, surename, birthdate } = req.body;

    const schema = yup.object().shape({
      steam: yup.string().required(),
      name: yup.string().required(),
      surename: yup.string().required(),
      birthdate: yup.string().required(),
    });

    try {
      await schema.validate({
        steam,
        name,
        surename,
        birthdate,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }

    let user;
    try {
      user = await User.findOneOrFail({ steam });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }

    let phone;
    do {
      phone = (Math.floor(Math.random() * 9000000) + 1000000).toString();
    } while (!Character.find({ phone }));

    let character: Character;
    try {
      character = new Character();

      character.user = user;
      character.name = name;
      character.surename = surename;
      character.birthdate = birthdate;
      character.phone = phone;

      await character.save();
    } catch (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ character });
  },

  async list(req: Request, res: Response) {
    const { steam } = req.body;

    const schema = yup.object().shape({
      steam: yup.string().required(),
    });

    try {
      await schema.validate({ steam });
    } catch (error) {
      return res.status(400).json({ error });
    }

    let user;
    try {
      user = await User.findOneOrFail({ steam }, { relations: ['characters'] });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }

    const characters = user.characters.filter(
      (character) => !character.deleted
    );

    return res.status(200).json({ characters });
  },

  async delete(req: Request, res: Response) {
    const { steam, id } = req.body;

    const schema = yup.object().shape({
      steam: yup.string().required(),
      id: yup.number().required(),
    });

    try {
      await schema.validate({
        steam,
        id,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }

    let character;
    try {
      character = await Character.findOneOrFail(id, {
        where: { user: { steam } },
      });

      character.deleted = true;

      await character.save();
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }

    return res.status(200).json({ character });
  },
};
