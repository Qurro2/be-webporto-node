import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import skillContoller from "../controller/skill-contoller.js";
import pengalamanController from "../controller/pengalaman-controller.js";
import fileUploadMiddleware from "../middleware/upload-image-middleware.js";
import projectController from "../controller/project-controller.js";
import profileController from "../controller/profile-controller.js";
import contactController from "../controller/contact-controller.js";

const devRouter = new express.Router();
devRouter.use(authMiddleware);

// mendapakatkan data user
devRouter.get("/dev/current", userController.get);
devRouter.patch("/dev/current/update", userController.update);
devRouter.delete("/dev/logout", userController.logout);

// skill routes
devRouter.post(
  "/dev/skill/create",
  fileUploadMiddleware,
  skillContoller.create
);
devRouter.patch(
  "/dev/skill/update/:skillId",
  fileUploadMiddleware,
  skillContoller.update
);
devRouter.get("/dev/skill/", skillContoller.getDashboard);
devRouter.get("/dev/skill/:skillId", skillContoller.getDashboardById);
devRouter.get("/dev/skill/:skillId", skillContoller.get);

devRouter.delete("/dev/skill/:skillId", skillContoller.remove);

//pengalaman routes
devRouter.post("/dev/pengalaman/create", pengalamanController.create);
devRouter.get(
  "/dev/pengalaman/current/:pengalamanId",
  pengalamanController.getDashboardById
);
devRouter.get("/dev/pengalaman", pengalamanController.getDashboard);
devRouter.patch(
  "/dev/pengalaman/update/:pengalamanId",
  pengalamanController.update
);
devRouter.delete("/dev/pengalaman/:pengalamanId", pengalamanController.remove);

// project routes
devRouter.post(
  "/dev/project/create",
  fileUploadMiddleware,
  projectController.create
);

devRouter.patch(
  "/dev/project/update/:projectId",
  fileUploadMiddleware,
  projectController.update
);

devRouter.get("/dev/project", projectController.getDashboard);
devRouter.get("/dev/project/:projectId", projectController.getDashboardById);

devRouter.delete("/dev/project/:projectId", projectController.remove);

//profile routes

devRouter.post(
  "/dev/profile/create",
  fileUploadMiddleware,
  profileController.create
);

devRouter.patch(
  "/dev/profile/update/:profileId",
  fileUploadMiddleware,
  profileController.update
);
devRouter.get("/dev/profile/", profileController.getDashboard);
devRouter.get("/dev/profile/:profileId", profileController.getDashboardById);
devRouter.delete("/dev/profile/:profileId", profileController.remove);

//contact routes

devRouter.get("/dev/contact", contactController.getDashboard);
devRouter.delete("/dev/contact/:contactId", contactController.remove);
export { devRouter };
