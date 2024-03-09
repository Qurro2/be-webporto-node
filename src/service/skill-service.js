import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response-errors.js";
import isregisteredMiddleware from "../middleware/isregistered-middleware.js";
import {
  createSkillValidation,
  getSkillValidation,
  updateSkillValidation,
} from "../validation/skill-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {
  const uploadValidation = validate(createSkillValidation, request);
  uploadValidation.dev = user.email;

  if (!user) throw new ResponseError(404, "User tidak ditemukan");

  const { nama } = uploadValidation;
  const isRegister = await isregisteredMiddleware.skillNamaRegistered(nama);
  if (isRegister) throw new ResponseError(401, "Nama telah terdaftar");
  return prismaClient.skill.create({
    data: uploadValidation,
    select: {
      id: true,
      nama: true,
      logo: true,
    },
  });
};

const update = async (user, request) => {
  // Lakukan validasi atau operasi lain sesuai kebutuhan
  const skill = validate(updateSkillValidation, request);
  const totalSkillInDB = await prismaClient.skill.count({
    where: {
      id: skill.id,
      dev: user.email,
    },
  });

  if (totalSkillInDB !== 1)
    throw new ResponseError(404, "Skill tidak ditemukan");
  // Perbarui data di database
  return prismaClient.skill.update({
    where: {
      id: skill.id,
    },
    data: {
      nama: skill.nama,
      logo: skill.logo,
    },
    select: {
      id: true,
      nama: true,
      logo: true,
    },
  });
};

const get = async () => {
  const skill = await prismaClient.skill.findMany({
    select: {
      nama: true,
      logo: true,
    },
  });
  if (!skill) throw new ResponseError(404, "Skill tidak ditemukan");

  return skill;
};

const getDashboard = async () => {
  const skillDashboard = await prismaClient.skill.findMany({
    select: {
      id: true,
      nama: true,
      logo: true,
    },
  });
  if (!skillDashboard)
    throw new ResponseError(404, "Data skill tidak ditemukan");

  return skillDashboard;
};

const getDashboardById = async (user, skillId) => {
  validate(getSkillValidation, skillId);
  const result = await prismaClient.skill.findFirst({
    where: {
      id: skillId,
      dev: user.email,
    },
    select: {
      id: true,
      nama: true,
      logo: true,
    },
  });
  if (!result) throw new ResponseError(404, "Data skill tidak ditemukan");
  return result;
};

const remove = async (user, skillId) => {
  skillId = validate(getSkillValidation, skillId);

  const totalSkillInDB = await prismaClient.skill.count({
    where: {
      id: skillId,
      dev: user.email,
    },
  });
  if (totalSkillInDB !== 1)
    throw new ResponseError(404, "Skill tidak ditemukan");

  return prismaClient.skill.delete({
    where: {
      id: skillId,
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
