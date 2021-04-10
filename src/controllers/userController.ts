import { Request, Response } from 'express';
import { User } from '../entities/User';
import * as yup from 'yup';

export default {
  async create(req: Request, res: Response) {
    const { steam, discord } = req.body;

    const schema = yup.object().shape({
      steam: yup.string().required(),
      discord: yup.string().required(),
    });

    try {
      await schema.validate({ steam, discord });
    } catch (error) {
      return res.status(400).json({ error });
    }

    let newUser: User;
    try {
      newUser = new User();

      newUser.steam = steam;
      newUser.discord = discord;

      await newUser.save();
    } catch (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json({ user: newUser });
  },

  async read(req: Request, res: Response) {
    const { steam } = req.body;

    const schema = yup.object().shape({
      steam: yup.string().required(),
    });

    try {
      await schema.validate({ steam });
    } catch (error) {
      return res.status(400).json({ error });
    }

    let user: User;
    try {
      user = await User.findOneOrFail({ steam });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }

    return res.status(200).json({ user });
  },

  async update(req: Request, res: Response) {
    const { steam, discord, admin, whitelisted, banned, priority } = req.body;

    const schema = yup.object().shape({
      steam: yup.string().required(),
      discord: yup.string(),
      admin: yup.boolean(),
      whitelisted: yup.boolean(),
      banned: yup.boolean(),
      priority: yup.number().integer().min(1).max(5),
    });

    try {
      await schema.validate({
        steam,
        discord,
        admin,
        whitelisted,
        banned,
        priority,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }

    let user: User;
    try {
      user = await User.findOneOrFail({ steam });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }

    try {
      const values = Object.entries({
        discord,
        admin,
        whitelisted,
        banned,
        priority,
      });

      values.forEach(([key, value]) => {
        if (value === undefined) return;

        // @ts-ignore
        user[key] = value;
      });

      await user.save();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }

    return res.status(200).json({ user });
  },
};
