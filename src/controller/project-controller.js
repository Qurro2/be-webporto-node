import projectService from "../service/project-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const createDataProject = {
      photo: req.files["photo"][0].filename,
      nama: req.body.nama,
      role: req.body.role,
      ulasan: req.body.ulasan,
      link: req.body.link,
    };

    const result = await projectService.create(user, createDataProject);
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
    const projectid = req.params.projectId;
    const newData = req.body;
    newData.id = projectid;
    if (req.files && req.files["photo"] && req.files["photo"][0]) {
      newData.photo = req.files["photo"][0].filename;
    }

    const result = await projectService.update(user, newData);
    res.status(200).json({
      data: result,
      message: "Data project berhasil di update",
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await projectService.get();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const result = await projectService.getDashboard();
    res.status(200).json({
      data: result,
      message: "Berhasil mendapatkan data project",
    });
  } catch (e) {
    next(e);
  }
};

const getDashboardById = async (req, res, next) => {
  try {
    const user = req.user;
    const projectId = parseInt(req.params.projectId);
    const result = await projectService.getDashboardById(user, projectId);
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
    const projectId = req.params.projectId;
    await projectService.remove(user, projectId);
    res.status(200).json({
      data: "Data project berhasil di hapus",
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
