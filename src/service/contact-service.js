import { ResponseError } from "../errors/response-errors.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { getContact, postContact } from "../validation/contact-validation.js";

const postUser = async (userData) => {
  const user = validate(postContact, userData);

  // Konversi nomor telepon dari string menjadi integer
  user.number = user.number.toString();
  return prismaClient.contact.create({
    data: user,
    select: {
      nama: true,
      email: true,
      number: true,
      ulasan: true,
    },
  });
};

const getDashboard = async () => {
  const getData = await prismaClient.contact.findMany({
    select: {
      id: true,
      nama: true,
      number: true,
      email: true,
      ulasan: true,
    },
  });
  if (!getData) throw new ResponseError(404, "Gagal mendapatkan data contact");
  return getData;
};

const remove = async (contactId) => {
  contactId = validate(getContact, contactId);
  const totalInDB = await prismaClient.contact.count({
    where: {
      id: contactId,
    },
  });
  if (totalInDB !== 1)
    throw new ResponseError(404, "Gagal menghapus data contact");

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

export default { postUser, getDashboard, remove };
