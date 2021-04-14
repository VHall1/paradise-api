import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CharacterCustom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'mp_m_freemode_01' })
  model: string;

  @Column({ type: 'jsonb' })
  custom: JSON;
}

// parents = parseInt(myClothes[1]),
// kinship = parseInt(myClothes[2]),
// eyecolor = parseInt(myClothes[3]),
// skincolor = parseInt(myClothes[4]),
// acne = parseInt(myClothes[5]),
// stains = parseInt(myClothes[6]),
// freckles = parseInt(myClothes[7]),
// aging = parseInt(myClothes[8]),

// Hair
// hair = parseInt(myClothes[9]),
// haircolor = parseInt(myClothes[10]),
// haircolor2 = parseInt(myClothes[11]),

// Makeup
// makeup = parseInt(myClothes[12]),
// makeupintensity = parseInt(myClothes[13]),
// makeupcolor = parseInt(myClothes[14]),

// Lipstick
// lipstick = parseInt(myClothes[15]),
// lipstickintensity = parseInt(myClothes[16]),
// lipstickcolor = parseInt(myClothes[17]),

// Eyebrow
// eyebrow = parseInt(myClothes[18]),
// eyebrowintensity = parseInt(myClothes[19]),
// eyebrowcolor = parseInt(myClothes[20]),

// Beard
// beard = parseInt(myClothes[21]),
// beardintentisy = parseInt(myClothes[22]),
// beardcolor = parseInt(myClothes[23]),

// Blush
// blush = parseInt(myClothes[24]),
// blushintentisy = parseInt(myClothes[25]),
// blushcolor = parseInt(myClothes[26]) }

// Features
// face00 = myClothes[27],
// face01 = myClothes[28],
// face04 = myClothes[29],
// face06 = myClothes[30],
// face08 = myClothes[31],
// face09 = myClothes[32],
// face10 = myClothes[33],
// face12 = myClothes[34],
// face13 = myClothes[35],
// face14 = myClothes[36],
// face15 = myClothes[37],
// face16 = myClothes[38],
// face17 = myClothes[39],
// face19 = myClothes[40]
