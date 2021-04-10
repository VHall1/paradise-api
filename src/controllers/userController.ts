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
      console.error(error);
      return res.status(500).json({ error });
    }

    return res.status(200).json({ newUser });
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

      return res.status(500).json({ error });
    }

    return res.status(200).json({ user });
  },

  async updateWhitelisted(req: Request, res: Response) {
    const { steam, status } = req.body;

    const schema = yup.object().shape({
      steam: yup.string().required(),
      status: yup.boolean().required(),
    });

    try {
      await schema.validate({ steam, status });
    } catch (error) {
      return res.status(400).json({ error });
    }

    let user: User;

    try {
      user = await User.findOneOrFail(steam);
    } catch {
      return res.status(400).json({ error: 'User not found' });
    }

    try {
      user.whitelisted = status;
      await user.save();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }

    return res.status(200).json({ status });
  },

  async updateBanned(req: Request, res: Response) {
    const { steam, status } = req.body;

    const schema = yup.object().shape({
      steam: yup.string().required(),
      status: yup.boolean().required(),
    });

    try {
      await schema.validate({ steam, status });
    } catch (error) {
      return res.status(400).json({ error });
    }

    let user: User;

    try {
      user = await User.findOneOrFail(steam);
    } catch {
      return res.status(400).json({ error: 'User not found' });
    }

    try {
      user.banned = status;
      await user.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }

    return res.status(200).json({ status });
  },
};
