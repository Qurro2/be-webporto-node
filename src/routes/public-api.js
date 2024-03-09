import express from "express";
import userController from "../controller/user-controller.js";
import projectController from "../controller/project-controller.js";
import profileController from "../controller/profile-controller.js";
import fileUploadMiddleware from "../middleware/upload-image-middleware.js";
import skillContoller from "../controller/skill-contoller.js";
import pengalamanController from "../controller/pengalaman-controller.js";
import contactController from "../controller/contact-controller.js";

const publicRouter = express.Router();
publicRouter.use(express.static("public/images"));
publicRouter.post("/user/register", userController.register);
publicRouter.post("/user/login", userController.login);
// publicRouter.get("/dev/project/:projectId", projectController.get);

// user get profile ,
publicRouter.get("/user/profile", profileController.get);

//user get skill

publicRouter.get("/user/skill", skillContoller.get);

//user get pengalaman

publicRouter.get("/user/pengalaman", pengalamanController.get);

//user get project

publicRouter.get("/user/project", projectController.get);

//user post contact
publicRouter.post("/user/contact", contactController.postUser);
export { publicRouter };
