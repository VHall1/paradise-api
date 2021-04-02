import { Request, Response } from 'express';
import { Character } from '../entities/Character';
import * as yup from 'yup';

export default {
  async create(req: Request, res: Response) {
    const { steam, name, surename, birthdate, phone } = req.body;

    const schema = yup.object().shape({
      steam: yup.string().required(),
      name: yup.string().required(),
      surename: yup.string().required(),
      birthdate: yup.string().required(),
      phone: yup.string().required(),
    });

    try {
      await schema.isValid({ steam, name, surename, birthdate, phone });
    } catch (error) {
      return res.status(400).json({ error });
    }

    // const user = await User.find({ steam });

    // if (user?.length) {
    //   return res.status(400).json({ error: 'err/already_exists' });
    // }

    // try {
    //   const newUser = new User();

    //   newUser.steam = steam;
    //   newUser.discord = discord;

    //   newUser.save();
    // } catch (err) {
    //   console.error(err);
    //   return res.status(500).json({ error: err });
    // }

    return res.status(200).send();
  },
};
