import Joi from "joi";

const createPengalamanValiation = Joi.object({
  nama: Joi.string().max(255).required(),
  bagian: Joi.string().max(255).required(),
  tahun: Joi.number().required(),
  ulasan: Joi.string().max(255).required(),
});

const getPengalamanValidation = Joi.number().positive().required();

const updatePengalamanValidation = Joi.object({
  id: Joi.number().positive().required(),
  nama: Joi.string().max(255).optional(),
  bagian: Joi.string().max(255).optional(),
  tahun: Joi.number().optional(),
  ulasan: Joi.string().max(255).optional(),
});
export {
  createPengalamanValiation,
  getPengalamanValidation,
  updatePengalamanValidation,
};
