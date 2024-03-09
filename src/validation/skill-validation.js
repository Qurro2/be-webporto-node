import Joi from "joi";

const createSkillValidation = Joi.object({
  nama: Joi.string().max(255).required(),
  logo: Joi.string().max(255).optional(),
});

const updateSkillValidation = Joi.object({
  id: Joi.number().positive().required(),
  nama: Joi.string().max(255).required(),
  logo: Joi.string().max(255).optional(),
});

const getSkillValidation = Joi.number().positive().required();

export { createSkillValidation, updateSkillValidation, getSkillValidation };
