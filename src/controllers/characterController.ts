// import { Request, Response } from 'express';
// import { User } from '../entities/User';
// import { Bank } from '../entities/Bank';
// import { Character } from '../entities/Character';
// import { CharacterSurvival } from '../entities/CharacterSurvival';
// import { CharacterCustom } from '../entities/CharacterCustom';
// import * as yup from 'yup';

// export default {
//   async create(req: Request, res: Response) {
//     const { steam, name, surename, birthdate } = req.body;

//     const schema = yup.object().shape({
//       steam: yup.string().required(),
//       name: yup.string().required(),
//       surename: yup.string().required(),
//       birthdate: yup.string().required(),
//     });

//     try {
//       await schema.validate({
//         steam,
//         name,
//         surename,
//         birthdate,
//       });

//       const user = await User.findOneOrFail({ steam });

//       let phone;
//       do {
//         phone = (Math.floor(Math.random() * 9000000) + 1000000).toString();
//       } while (!Character.find({ phone }));

//       const character = new Character();

//       character.user = user;
//       character.name = name;
//       character.surename = surename;
//       character.birthdate = birthdate;
//       character.phone = phone;

//       await character.save();

//       const bank = new Bank();
//       bank.character = character;
//       await bank.save();

//       const survival = new CharacterSurvival();
//       survival.character = character;
//       await survival.save();

//       const custom = new CharacterCustom();
//       custom.character = character;
//       await custom.save();

//       return res.status(200).json({ character });
//     } catch (error) {
//       if (error.name === 'EntityNotFound')
//         return res.status(404).json({ error });

//       return res.status(400).json({ error });
//     }
//   },

//   async listCharacters(req: Request, res: Response) {
//     const { steam } = req.params;

//     const schema = yup.object().shape({
//       steam: yup.string().required(),
//     });

//     try {
//       await schema.validate({ steam });

//       const user = await User.findOneOrFail(
//         { steam },
//         { relations: ['characters'] }
//       );

//       const characters = user.characters.filter(
//         (character) => !character.deleted
//       );

//       return res.status(200).json({ characters });
//     } catch (error) {
//       if (error.name === 'EntityNotFound')
//         return res.status(404).json({ error });

//       return res.status(400).json({ error });
//     }
//   },

//   async delete(req: Request, res: Response) {
//     const { steam, id } = req.body;

//     const schema = yup.object().shape({
//       steam: yup.string().required(),
//       id: yup.number().required(),
//     });

//     try {
//       await schema.validate({
//         steam,
//         id,
//       });

//       const character = await Character.findOneOrFail(id, {
//         relations: ['user'],
//       });

//       if (character.user.steam !== steam) {
//         throw {
//           name: 'EntityNotFound',
//           message: `Could not find any entity of type \"User\" matching: {\n\"steam\": \"${steam}\"\n`,
//         };
//       }

//       character.deleted = true;

//       await character.save();

//       return res.status(200).json({ character });
//     } catch (error) {
//       if (error.name === 'EntityNotFound')
//         return res.status(404).json({ error });

//       return res.status(400).json({ error });
//     }
//   },

//   // async updateCoords(req: Request, res: Response) {
//   //   const { id, lastCoords } = req.body;

//   //   console.log(id, lastCoords);
//   //   const schema = yup.object().shape({
//   //     id: yup.number().required(),
//   //     lastCoords: yup.array().required(),
//   //   });

//   //   await schema.validate({ id, lastCoords });

//   //   let character = await Character.findOneOrFail(id, {
//   //     relations: ['characterSurvival'],
//   //   });

//   //   let characterSurvival: CharacterSurvival;
//   //   if (!character.characterSurvival) {
//   //     characterSurvival = new CharacterSurvival();

//   //     character.characterSurvival = characterSurvival;
//   //   } else characterSurvival = character.characterSurvival;

//   //   characterSurvival.lastCoords = lastCoords;
//   //   await characterSurvival.save();
//   //   await character.save();

//   //   return res.status(200).send();
//   // },

//   async getCustom(req: Request, res: Response) {
//     const { id } = req.params;

//     const schema = yup.object().shape({
//       id: yup.number().required(),
//     });

//     try {
//       await schema.validate({ id });

//       const character = await Character.findOneOrFail(id);
//       const { custom, model, clothes } = await CharacterCustom.findOneOrFail({
//         character,
//       });

//       return res.status(200).json({ custom, model, clothes });
//     } catch (error) {
//       if (error.name === 'EntityNotFound')
//         return res.status(404).json({ error });

//       return res.status(400).json({ error });
//     }
//   },

//   async updateCustom(req: Request, res: Response) {
//     const { id, custom } = req.body;
//     const customJSON = JSON.parse(custom);

//     const schema = yup.object().shape({
//       id: yup.number().required(),
//       customJSON: yup.object().required(),
//     });

//     try {
//       await schema.validate({ id, customJSON });

//       const character = await Character.findOneOrFail(id);
//       const characterCustom = await CharacterCustom.findOneOrFail({
//         character,
//       });

//       characterCustom.custom = customJSON;

//       await characterCustom.save();

//       return res.status(200).json({ custom: characterCustom.custom });
//     } catch (error) {
//       if (error.name === 'EntityNotFound')
//         return res.status(404).json({ error });

//       return res.status(400).json({ error });
//     }
//   },

//   async updateModel(req: Request, res: Response) {
//     const { id, model } = req.body;

//     const schema = yup.object().shape({
//       id: yup.number().required(),
//       model: yup.string().required(),
//     });

//     try {
//       await schema.validate({ id, model });

//       const character = await Character.findOneOrFail(id);
//       const characterCustom = await CharacterCustom.findOneOrFail({
//         character,
//       });

//       characterCustom.model = model;

//       await characterCustom.save();

//       return res.status(200).json({ model: characterCustom.model });
//     } catch (error) {
//       console.error(error);
//       if (error.name === 'EntityNotFound')
//         return res.status(404).json({ error });

//       return res.status(400).json({ error });
//     }
//   },

//   async updateClothes(req: Request, res: Response) {
//     const { id, clothes } = req.body;
//     const clothesJSON = JSON.parse(clothes);

//     const schema = yup.object().shape({
//       id: yup.number().required(),
//       clothesJSON: yup.object().required(),
//     });

//     try {
//       await schema.validate({ id, clothesJSON });

//       const character = await Character.findOneOrFail(id);
//       const characterCustom = await CharacterCustom.findOneOrFail({
//         character,
//       });

//       characterCustom.custom = clothesJSON;

//       await characterCustom.save();

//       return res.status(200).json({ clothes: characterCustom.clothes });
//     } catch (error) {
//       if (error.name === 'EntityNotFound')
//         return res.status(404).json({ error });

//       return res.status(400).json({ error });
//     }
//   },
// };
