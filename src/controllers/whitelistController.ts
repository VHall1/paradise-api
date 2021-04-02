import { Request, Response } from 'express';
import { User } from '../entities/User';

export default {
  async add(req: Request, res: Response) {
    const { steam } = req.body;

    if (!steam) {
      return res.status(400).json({ error: 'err/empty_field' });
    }

    let user: User;
    try {
      user = await User.findOneOrFail(steam);
    } catch {
      return res.status(400).json({ error: 'err/user_not_found' });
    }

    try {
      user.whitelisted = true;
      await user.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }

    return res.status(200).send();
  },
};
