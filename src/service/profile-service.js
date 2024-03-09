import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
  createProfileValidation,
  updateProfileValidation,
  getProfileValidation,
} from "../validation/profile-validaiton.js";
import { ResponseError } from "../errors/response-errors.js";

const create = async (user, request) => {
  const profile = validate(createProfileValidation, request);
  profile.dev = user.email;

  if (!user) throw new ResponseError(404, "User tidak ditemukan");

  return prismaClient.profile.create({
    data: profile,
    select: {
      nama: true,
      divisi: true,
      tentang: true,
      photo: true,
      cv: true,
    },
  });
};

const update = async (user, request) => {
  const profile = validate(updateProfileValidation, request);
  const profileInDB = await prismaClient.profile.count({
    where: {
      id: profile.id,
    },
  });

  if (profileInDB !== 1) {
    throw new ResponseError(404, "Data profile tidak ditemukan");
  }

  return prismaClient.profile.update({
    where: {
      id: profile.id,
    },
    data: {
      nama: profile.nama,
      divisi: profile.divisi,
      tentang: profile.tentang,
      photo: profile.photo,
      cv: profile.cv,
    },
    select: {
      id: true,
      nama: true,
      divisi: true,
      tentang: true,
      photo: true,
      cv: true,
    },
  });
};

const get = async () => {
  const profile = await prismaClient.profile.findFirst({
    select: {
      nama: true,
      divisi: true,
      tentang: true,
      photo: true,
      cv: true,
    },
  });

  if (!profile) throw new ResponseError(404, "Data profile tidak ditemukan");

  return profile;
};

const getDashboard = async () => {
  const profileDashboard = await prismaClient.profile.findMany({
    select: {
      id: true,
      nama: true,
      divisi: true,
      tentang: true,
      photo: true,
      cv: true,
    },
  });
  if (!profileDashboard)
    throw new ResponseError(404, "Data profile di dashboard tidak ditemukan");
  return profileDashboard;
};

const getDashboardById = async (user, profileId) => {
  // Validasi profileId
  validate(getProfileValidation, profileId);

  const result = await prismaClient.profile.findFirst({
    where: {
      id: profileId,
      dev: user.email,
    },
    select: {
      id: true,
      nama: true,
      divisi: true,
      tentang: true,
      photo: true,
      cv: true,
    },
  });
  if (!result) throw new ResponseError(404, "Data tidak ditemukan");
  return result;
};

const remove = async (user, profileId) => {
  profileId = validate(getProfileValidation, profileId);

  const totalInDB = await prismaClient.profile.count({
    where: {
      id: profileId,
      dev: user.email,
    },
  });
  if (totalInDB !== 1)
    throw new ResponseError(404, "Data profile tidak ditemukan");

  return prismaClient.profile.delete({
    where: {
      id: profileId,
    },
  });
};
export default {
  create,
  update,
  get,
  remove,
  getDashboard,
  getDashboardById,
};
