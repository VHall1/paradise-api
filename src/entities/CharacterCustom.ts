import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CharacterCustom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'mp_m_freemode_01' })
  model: string;
}

// user_id = parseInt(user_id),
// char_id = 1,
// fathers = parseInt(myClothes[1]),
// kinship = parseInt(myClothes[2]),
// eyecolor = parseInt(myClothes[3]),
// skincolor = parseInt(myClothes[4]),
// acne = parseInt(myClothes[5]),
// stains = parseInt(myClothes[6]),
// freckles = parseInt(myClothes[7]),
// aging = parseInt(myClothes[8]),
// hair = parseInt(myClothes[9]),
// haircolor = parseInt(myClothes[10]),
// haircolor2 = parseInt(myClothes[11]),
// makeup = parseInt(myClothes[12]),
// makeupintensity = parseInt(myClothes[13]),
// makeupcolor = parseInt(myClothes[14]),
// lipstick = parseInt(myClothes[15]),
// lipstickintensity = parseInt(myClothes[16]),
// lipstickcolor = parseInt(myClothes[17]),
// eyebrow = parseInt(myClothes[18]),
// eyebrowintensity = parseInt(myClothes[19]),
// eyebrowcolor = parseInt(myClothes[20]),
// beard = parseInt(myClothes[21]),
// beardintentisy = parseInt(myClothes[22]),
// beardcolor = parseInt(myClothes[23]),
// blush = parseInt(myClothes[24]),
// blushintentisy = parseInt(myClothes[25]),
// blushcolor = parseInt(myClothes[26]) }
