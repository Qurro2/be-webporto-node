import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response-errors.js";
import { validate } from "../validation/validation.js";
import {
  createProjectValidation,
  getProjectValidation,
  updateProjectValidation,
} from "../validation/project-validation.js";

const create = async (user, request) => {
  const project = validate(createProjectValidation, request);
  project.dev = user.email;

  if (!user) throw new ResponseError(404, "User tidak ditemukan");

  return prismaClient.project.create({
    data: project,
    select: {
      id: true,
      photo: true,
      nama: true,
      role: true,
      ulasan: true,
      link: true,
    },
  });
};

const update = async (user, request) => {
  const project = validate(updateProjectValidation, request);
  const totalProjectInDB = await prismaClient.project.count({
    where: {
      id: project.id,
      dev: user.email,
    },
  });
  if (totalProjectInDB !== 1)
    throw new ResponseError(404, "Project tidak ditemukan");
  return prismaClient.project.update({
    where: {
      id: project.id,
    },
    data: {
      photo: project.photo,
      nama: project.nama,
      role: project.role,
      ulasan: project.ulasan,
      link: project.link,
    },
    select: {
      id: true,
      photo: true,
      nama: true,
      role: true,
      ulasan: true,
      link: true,
    },
  });
};

const get = async () => {
  const project = await prismaClient.project.findMany({
    select: {
      id: true,
      photo: true,
      nama: true,
      role: true,
      ulasan: true,
      link: true,
    },
  });
  if (!project) throw new ResponseError(404, "Data project tidak ditemukan");

  return project;
};

const getDashboard = async () => {
  const projectDashboard = await prismaClient.project.findMany({
    select: {
      id: true,
      photo: true,
      nama: true,
      role: true,
      ulasan: true,
      link: true,
    },
  });
  if (!projectDashboard)
    throw new ResponseError(404, "Data project tidak ditemukan");
  return projectDashboard;
};

const getDashboardById = async (user, projectId) => {
  validate(getProjectValidation, projectId);

  const result = await prismaClient.project.findFirst({
    where: {
      id: projectId,
      dev: user.email,
    },
    select: {
      id: true,
      photo: true,
      nama: true,
      role: true,
      ulasan: true,
      link: true,
    },
  });
  if (!user) throw new ResponseError(403, "Anda tidak di izinkan");
  if (!result) throw new ResponseError(404, "Data project tidak ditemukan");

  return result;
};

const remove = async (user, projectId) => {
  projectId = validate(getProjectValidation, projectId);

  const totalProjectInDB = await prismaClient.project.count({
    where: {
      id: projectId,
      dev: user.email,
    },
  });
  if (totalProjectInDB !== 1)
    throw new ResponseError(404, "Data project tidak ditemukan");

  return prismaClient.project.delete({
    where: {
      id: projectId,
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
