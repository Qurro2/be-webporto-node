import { prismaClient } from "../application/database.js";

const isEmailRegistered = async (email) => {
  const totalInDb = await prismaClient.user.count({
    where: {
      email: email,
    },
  });
  return totalInDb > 0;
};

const isNamaRegistered = async (nama) => {
  const totalInDb = await prismaClient.user.count({
    where: {
      nama: nama,
    },
  });
  return totalInDb > 0;
};

const skillNamaRegistered = async (nama) => {
  const totalNamaInDB = await prismaClient.skill.count({
    where: {
      nama: nama,
    },
  });
  return totalNamaInDB > 0;
};

const skillLogoRegistered = async (logo) => {
  const totalLogoInDB = await prismaClient.skill.count({
    where: {
      logo: logo,
    },
  });
  return totalLogoInDB > 0;
};

export default {
  isEmailRegistered,
  isNamaRegistered,
  skillNamaRegistered,
};
