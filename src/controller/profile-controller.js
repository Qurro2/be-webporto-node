import profileService from "../service/profile-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const createDataProfile = {
      nama: req.body.nama,
      divisi: req.body.divisi,
      tentang: req.body.tentang,
      photo: req.files["photo"][0].filename,
      cv: req.files["cv"][0].filename,
    };

    const result = await profileService.create(user, createDataProfile);
    res.status(200).json({
      data: result,
      message: "Berhasil membuat data profile",
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const dev = req.user;
    const profileId = req.params.profileId;
    const newDataProfile = req.body;
    newDataProfile.id = profileId;

    if (req.files && req.files["photo"] && req.files["photo"][0]) {
      newDataProfile.photo = req.files["photo"][0].filename;
    }

    if (req.files && req.files["cv"] && req.files["cv"][0]) {
      newDataProfile.cv = req.files["cv"][0].filename;
    }

    const result = await profileService.update(dev, newDataProfile);

    res.status(200).json({
      data: result,
      message: "Data berhasil diupdate",
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await profileService.get();
    res.status(200).json({
      data: result,
      message: "Berhasil mendapatkan data profile",
    });
  } catch (e) {
    next(e);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const result = await profileService.getDashboard();
    res.status(200).json({
      data: result,
      message: "Data berhasil didapatkan",
    });
  } catch (e) {
    next(e);
  }
};

const getDashboardById = async (req, res, next) => {
  try {
    const user = req.user;
    const profileId = parseInt(req.params.profileId); // Change variable name to profileId
    const result = await profileService.getDashboardById(user, profileId); // Correct parameter name
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const profileId = req.params.profileId;
    await profileService.remove(user, profileId);
    res.status(200).json({
      data: "Data profile berhasil di hapus",
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
