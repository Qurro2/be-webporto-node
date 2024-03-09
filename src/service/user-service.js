import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response-errors.js";
import {
  userRegisterValidation,
  userLoginValidation,
  getUserValidation,
  userUpdateValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import isregisteredMiddleware from "../middleware/isregistered-middleware.js";

const register = async (request) => {
  const user = validate(userRegisterValidation, request);
  const { email, nama } = user;
  const isEmailRegistered = await isregisteredMiddleware.isEmailRegistered(
    email
  );
  const isNamaRegistered = await isregisteredMiddleware.isNamaRegistered(nama);
  if (isEmailRegistered) throw new ResponseError(400, "Email telah terdaftar");

  if (isNamaRegistered) throw new ResponseError(400, "Nama telah terdaftar");
  //   const jumlahUser = await prismaClient.user.count({
  //     where: {
  //       email: user.email,
  //     },
  //   });

  //   if (jumlahUser === 1) {
  //     throw new ResponseError(400, "Email dan nama telah terdaftar");
  //   }
  user.password = await bcrypt.hash(user.password, 10);

  const now = new Date();
  user.created_at = now;
  user.updated_at = now;
  return prismaClient.user.create({
    data: user,
    select: {
      email: true,
      nama: true,
    },
  });
};

const login = async (request) => {
  const loginValidation = validate(userLoginValidation, request);
  const user = await prismaClient.user.findUnique({
    where: {
      email: loginValidation.email,
    },
    select: {
      email: true,
      password: true,
    },
  });
  if (!user) throw new ResponseError(401, "Email tidak terdaftar");

  const passwordValid = await bcrypt.compare(
    loginValidation.password,
    user.password
  );
  if (!passwordValid) throw new ResponseError(401, "Password salah!");

  if (!user || !passwordValid === null)
    throw new ResponseError(400, "Harap isi email dan password");
  const token = uuid();
  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      email: user.email,
    },
    select: {
      token: true,
    },
  });
};

const get = async (email) => {
  email = validate(getUserValidation, email);

  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      nama: true,
    },
  });
  if (!user) {
    throw new ResponseError(401, "Data user tidak ditemukan");
  }
  return user;
};

const update = async (request) => {
  const user = validate(userUpdateValidation, request);

  const totalUser = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });
  if (totalUser !== 1) {
    throw new ResponseError(404, "Data user tidak ditemukan");
  }

  // Verifikasi password yang sekarang aktif
  const userData = await prismaClient.user.findUnique({
    where: {
      email: user.email,
    },
  });
  const isPasswordValid = await bcrypt.compare(
    user.password,
    userData.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(400, "Password lama tidak valid");
  }

  const data = {};
  if (user.nama) {
    data.nama = user.nama;
  }
  if (user.newPassword && user.confirmPassword) {
    if (user.newPassword !== user.confirmPassword) {
      throw new ResponseError(
        400,
        "Confrim password tidak sama dengan New password"
      );
    }
    data.password = await bcrypt.hash(user.newPassword, 10);
  }

  const updatedUser = await prismaClient.user.update({
    where: {
      email: user.email,
    },
    data: data,
    select: {
      email: true,
      nama: true,
    },
  });
  return updatedUser;
};

const logout = async (email) => {
  email = validate(getUserValidation, email);
  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) throw new ResponseError(404, "User Tidak ditemukan");

  return prismaClient.user.update({
    where: {
      email: email,
    },
    data: {
      token: null,
    },
    select: {
      email: true,
    },
  });
};

export default {
  register,
  login,
  get,
  update,
  logout,
};
