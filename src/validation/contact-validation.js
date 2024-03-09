import Joi from "joi";

const postContact = Joi.object({
  nama: Joi.string().min(4).max(255).required(),
  email: Joi.string().email().max(255).required(),
  number: Joi.number().required(), // Mengubah menjadi string
  ulasan: Joi.string().min(10).max(1500).required(),
});
const getContact = Joi.number().positive().required();
export { postContact, getContact };
