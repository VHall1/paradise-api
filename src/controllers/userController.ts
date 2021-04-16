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
    const { steam } = req.params;

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

  async setWhitelisted(req: Request, res: Response) {
    const { steam, status } = req.body;

    const schema = yup.object().shape({
      steam: yup.string().required(),
      status: yup.boolean().required(),
    });

    try {
      await schema.validate({ steam, status });

      const user = await User.findOneOrFail({ steam });

      user.whitelisted = status;

      await user.save();

      return res.status(200).json({ user });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }
  },

  async setBanned(req: Request, res: Response) {
    const { steam, status } = req.body;

    const schema = yup.object().shape({
      steam: yup.string().required(),
      status: yup.boolean().required(),
    });

    try {
      await schema.validate({ steam, status });

      const user = await User.findOneOrFail({ steam });

      user.banned = status;

      await user.save();

      return res.status(200).json({ user });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }
  },

  async setPriority(req: Request, res: Response) {
    const { steam, priority } = req.body;

    const schema = yup.object().shape({
      steam: yup.string().required(),
      priority: yup.number().min(1).max(5).required(),
    });

    try {
      await schema.validate({ steam, priority });

      const user = await User.findOneOrFail({ steam });

      user.priority = priority;

      await user.save();

      return res.status(200).json({ user });
    } catch (error) {
      if (error.name === 'EntityNotFound')
        return res.status(404).json({ error });

      return res.status(400).json({ error });
    }
  },
};
