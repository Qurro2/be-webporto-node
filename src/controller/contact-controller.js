import contactService from "../service/contact-service.js";

const postUser = async (req, res, next) => {
  try {
    const userData = req.body;
    userData.number = userData.number.toString();
    const result = await contactService.postUser(userData);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const result = await contactService.getDashboard();
    res.status(200).json({
      data: result,
      message: "Berhasil mendapatkan data contact",
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    await contactService.remove(contactId);
    res.status(200).json({
      data: "Data contact berhasil di hapus",
    });
  } catch (e) {
    next(e);
  }
};
export default {
  postUser,
  getDashboard,
  remove,
};
