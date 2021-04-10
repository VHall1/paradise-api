import { Request, Response } from 'express';
import { User } from '../entities/User';
import * as yup from 'yup';

export default {
  async create(req: Request, res: Response) {
    const { steam, discord } = req.body;

    if (!steam || !discord) {
      return res.status(400).json({ error: 'err/empty_field' });
    }

    const user = await User.find({ steam });

    if (user?.length) {
      return res.status(400).json({ error: 'err/already_exists' });
    }

    try {
      const newUser = new User();

      newUser.steam = steam;
      newUser.discord = discord;

      newUser.save();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }

    return res.status(200).send();
  },

  async get(req: Request, res: Response) {
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
      user = await User.findOneOrFail(steam);
    } catch {
      return res.status(400).json({ error: 'User not found' });
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
