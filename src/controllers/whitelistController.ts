import { Request, Response } from 'express';
import { User } from '../entities/User';
import * as yup from 'yup';

const steamSchema = yup.object().shape({
  steam: yup.string().required(),
});

export default {
  async add(req: Request, res: Response) {
    const { steam } = req.body;

    try {
      await steamSchema.isValid({ steam });
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
      user.whitelisted = true;
      await user.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }

    return res.status(200).send();
  },

  async isWhitelisted(req: Request, res: Response) {
    const { steam } = req.body;

    try {
      await steamSchema.isValid({ steam });
    } catch (error) {
      return res.status(400).json({ error });
    }

    let user: User;

    try {
      user = await User.findOneOrFail(steam);
    } catch {
      return res.status(400).json({ error: 'User not found' });
    }

    return res.status(200).json({ status: user.whitelisted });
  },
};
