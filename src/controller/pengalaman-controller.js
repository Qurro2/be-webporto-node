import pengalamanService from "../service/pengalaman-service.js";

const create = async (req, res, next) => {
  try {
    const dev = req.user;
    const body = req.body;

    const result = await pengalamanService.create(dev, body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await pengalamanService.get();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const result = await pengalamanService.getDashboard();
    res.status(200).json({
      data: result,
      message: "Berhasil mendapatkan data",
    });
  } catch (e) {
    next(e);
  }
};

const getDashboardById = async (req, res, next) => {
  try {
    const user = req.user;
    const pengalamanId = parseInt(req.params.pengalamanId);
    const result = await pengalamanService.getDashboardById(user, pengalamanId);
    res.status(200).json({
      data: result,
      message: "Sukses mendapatkan Data",
    });
  } catch (e) {
    next(e);
  }
};
const update = async (req, res, next) => {
  try {
    const dev = req.user;
    const id = req.params.pengalamanId;
    const requestBody = req.body;
    requestBody.id = id;
    const result = await pengalamanService.update(dev, requestBody);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const dev = req.user;
    const id = req.params.pengalamanId;
    await pengalamanService.remove(dev, id);
    res.status(200).json({
      data: "Berhasil dihapus",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  update,
  remove,
  getDashboardById,
  getDashboard,
};
