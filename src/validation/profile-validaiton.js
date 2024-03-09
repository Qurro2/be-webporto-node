import Joi from "joi";

const createProfileValidation = Joi.object({
  nama: Joi.string().max(255).required(),
  divisi: Joi.string().max(255).optional(),
  tentang: Joi.string().max(1500).optional(),
  photo: Joi.string().max(255).optional(),
  cv: Joi.string().max(255).optional(),
});

const updateProfileValidation = Joi.object({
  id: Joi.number().positive().required(),
  nama: Joi.string().max(255).optional(),
  divisi: Joi.string().max(255).optional(),
  tentang: Joi.string().max(1500).optional(),
  photo: Joi.string().max(255).optional(),
  cv: Joi.string().max(255).optional(),
});

const getProfileValidation = Joi.number().positive().required();

export {
  createProfileValidation,
  updateProfileValidation,
  getProfileValidation,
};
