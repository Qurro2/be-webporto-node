import skillService from "../service/skill-service.js";
import { createSkillValidation } from "../validation/skill-validation.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;

    //Pastikan req.body adalah objek yang sesuai dengan skema Joi

    const dataToCreate = {
      nama: req.body.nama,
      logo: req.files["logo"][0].filename,
    };

    // const { nama } = req.body;
    // const logoFile = req.files["logo"][0];

    // const validationResult = createSkillValidation.validate(dataToCreate);

    // if (validationResult.error) {
    //   throw new ResponseError(400, validationResult.error.details[0].message);
    // }

    const result = await skillService.create(user, dataToCreate);

    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const skillId = req.params.skillId;

    // Pastikan ID valid sebelum melakukan pembaruan
    // if (!isValidSkillId(skillId)) {
    //   return res.status(400).json({ errors: "Invalid skill ID." });
    // }

    const newData = req.body;
    newData.id = skillId;

    // Pastikan file yang diunggah tersedia sebelum mengakses
    if (req.files && req.files["logo"] && req.files["logo"][0]) {
      newData.logo = req.files["logo"][0].filename;
    }

    const result = await skillService.update(user, newData);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await skillService.get();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const result = await skillService.getDashboard();
    res.status(200).json({
      data: result,
      message: "Data berhasil di dapatkan",
    });
  } catch (e) {
    next(e);
  }
};

const getDashboardById = async (req, res, next) => {
  try {
    const user = req.user;
    const skillId = parseInt(req.params.skillId);
    const result = await skillService.getDashboardById(user, skillId);
    res.status(200).json({
      data: result,
      message: "Berhasil mendapatkan data skill",
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const skillId = req.params.skillId;
    await skillService.remove(user, skillId);
    res.status(200).json({
      data: "Data berhasil di hapus",
    });
  } catch (e) {
    next(e);
  }
};
export default {
  create,
  update,
  get,
  remove,
  getDashboard,
  getDashboardById,
};
