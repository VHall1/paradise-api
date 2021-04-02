import { Request, Response } from 'express';
import { User } from '../entities/User';

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
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }

    return res.status(200).send();
  },
};
