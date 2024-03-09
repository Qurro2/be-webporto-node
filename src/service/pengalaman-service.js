import { ResponseError } from "../errors/response-errors.js";
import { validate } from "../validation/validation.js";
import {
  createPengalamanValiation,
  getPengalamanValidation,
  updatePengalamanValidation,
} from "../validation/pengalaman-validation.js";
import { prismaClient } from "../application/database.js";

const create = async (user, request) => {
  const createValidation = validate(createPengalamanValiation, request);
  createValidation.dev = user.email;

  const tahun = new Date().getFullYear();

  if (isNaN(tahun) || typeof tahun !== "number") {
    throw new ResponseError(401, "Tahun harus berupa angka");
  }
  return prismaClient.pengalaman.create({
    data: createValidation,
    select: {
      nama: true,
      bagian: true,
      tahun: true,
      ulasan: true,
    },
  });
};

const get = async () => {
  const pengalaman = await prismaClient.pengalaman.findMany({
    select: {
      id: true,
      nama: true,
      bagian: true,
      tahun: true,
      ulasan: true,
    },
  });
  if (!pengalaman) throw new ResponseError(404, "pengalaman tidak di temukan");
  return pengalaman;
};

const getDashboard = async () => {
  const dataPengalaman = await prismaClient.pengalaman.findMany({
    select: {
      id: true,
      nama: true,
      bagian: true,
      tahun: true,
      ulasan: true,
    },
  });
  if (!dataPengalaman)
    throw new ResponseError(404, "Gagal mendapatkan data pengalaman");
  return dataPengalaman;
};
const getDashboardById = async (user, pengalamanId) => {
  validate(getPengalamanValidation, pengalamanId);

  const result = await prismaClient.pengalaman.findFirst({
    where: {
      id: pengalamanId,
      dev: user.email,
    },
    select: {
      id: true,
      nama: true,
      bagian: true,
      ulasan: true,
      tahun: true,
    },
  });
  if (!result) throw new ResponseError(404, "Tidak dapat data pengalaman");
  return result;
};

const update = async (user, request) => {
  const pengalaman = validate(updatePengalamanValidation, request);
  const totalInDB = await prismaClient.pengalaman.count({
    where: {
      id: pengalaman.id,
      dev: user.email,
    },
  });
  if (totalInDB !== 1)
    throw new ResponseError(404, "Pengalaman tidak ditemukan");

  return prismaClient.pengalaman.update({
    where: {
      id: pengalaman.id,
    },
    data: {
      nama: pengalaman.nama,
      bagian: pengalaman.bagian,
      tahun: pengalaman.tahun,
      ulasan: pengalaman.ulasan,
    },
    select: {
      id: true,
      nama: true,
      bagian: true,
      tahun: true,
      ulasan: true,
    },
  });
};

const remove = async (user, pengalamanId) => {
  pengalamanId = validate(getPengalamanValidation, pengalamanId);
  const totalInDB = await prismaClient.pengalaman.count({
    where: {
      id: pengalamanId,
      dev: user.email,
    },
  });
  if (totalInDB !== 1)
    throw new ResponseError(404, "Pengalaman tidak ditemukan");

  return prismaClient.pengalaman.delete({
    where: {
      id: pengalamanId,
    },
  });
};

export default {
  create,
  get,
  update,
  remove,
  getDashboardById,
  getDashboard,
};
