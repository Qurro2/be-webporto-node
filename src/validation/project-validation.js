import Joi from "joi";

const createProjectValidation = Joi.object({
  photo: Joi.string().max(255).optional(),
  nama: Joi.string().max(255).required(),
  role: Joi.string().max(255).required(),
  ulasan: Joi.string().max(255).required(),
  link: Joi.string().max(300).optional().allow(""),
});

const updateProjectValidation = Joi.object({
  id: Joi.number().positive().required(),
  photo: Joi.string().max(255).optional(),
  nama: Joi.string().max(255).optional(),
  role: Joi.string().max(255).optional(),
  ulasan: Joi.string().max(255).optional(),
  link: Joi.string().max(300).optional().allow(""),
});

const getProjectValidation = Joi.number().positive().required();

export {
  createProjectValidation,
  getProjectValidation,
  updateProjectValidation,
};
